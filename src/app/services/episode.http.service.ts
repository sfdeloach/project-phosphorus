import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { ApiUrlsList } from './lists/api.urls.list';

import { Episode } from '../models/episode.model';
import { Message } from '../models/message.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';

@Injectable()
export class EpisodeHttpService {
  episodes: Subject<Episode[]> = new Subject();
  message: Subject<Message> = new Subject();
  episodesUrl: string = this.url.episodeAPI;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private url: ApiUrlsList) {}

  getEpisodes() {
    this.http.get<Episode[]>(this.episodesUrl).subscribe(
      (episodes: Episode[]) => {
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
            new Message(
              res.insertedCount +
                ' episodes created from XCAD data. Ready to receive Cafe file.'
            )
          );
        },
        error => {
          console.error(error);
        }
      );
  }

  updateEpisodes(episodes: Episode[]) {
    this.http
      .delete<RemoveResponse>(this.episodesUrl)
      .subscribe((removeRes: RemoveResponse) => {
        this.http
          .post<InsertManyResponse<Episode[]>>(
            this.episodesUrl,
            { episodes: episodes },
            this.httpOptions
          )
          .subscribe(
            (insertManyRes: InsertManyResponse<Episode[]>) => {
              this.message.next(
                new Message(
                  insertManyRes.insertedCount +
                    ' episodes updated with data from Cafe.'
                )
              );
            },
            error => {
              console.error(error);
            }
          );
      });
  }

  wipeEpisodes() {
    this.http
      .delete<RemoveResponse>(this.episodesUrl)
      .subscribe((res: RemoveResponse) => {
        this.message.next(
          new Message('All episodes have been successfully wiped')
        );
      });
  }
}
