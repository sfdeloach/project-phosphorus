import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Episode } from '../models/episode.model';
import { Message } from '../models/message.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';
import { environment } from '../../environments/environment';

@Injectable()
export class EpisodeHttpService {
  loadedEpisodes: Episode[] = [];
  episodes: Subject<Episode[]> = new Subject();
  message: Subject<Message> = new Subject();
  episodesUrl: string = environment.apiUrl + 'episodes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getEpisodes() {
    this.http.get<Episode[]>(this.episodesUrl).subscribe(
      (episodes: Episode[]) => {
        this.loadedEpisodes = episodes;
        this.episodes.next(episodes);
      },
      err => {
        console.error(err);
      }
    );
  }

  insertEpisodes(episodes: Episode[]) {
    this.http
      .post<InsertManyResponse<Episode[]>>(
        this.episodesUrl,
        { episodes: episodes },
        this.httpOptions
      )
      .subscribe(
        (res: InsertManyResponse<Episode[]>) => {
          this.message.next(
            new Message(res.insertedCount + '  episodes uploaded to the database.')
          );
        },
        error => {
          console.error(error);
        }
      );
  }

  wipeEpisodes() {
    this.http.delete<RemoveResponse>(this.episodesUrl).subscribe((res: RemoveResponse) => {
      this.message.next(new Message('All episodes have been successfully wiped'));
      this.loadedEpisodes = [];
      this.episodes.next([]);
    });
  }
}
