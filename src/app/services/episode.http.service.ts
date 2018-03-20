import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Episode } from '../models/episode.model';

@Injectable()
export class EpisodeService {
  episodes: Subject<Episode[]> = new Subject();
  serverResponse: Subject<any> = new Subject(); // TODO: Come back and type this?
  episodesUrl: string = 'http://localhost:3000/api/episodes';
  connectionError: string = "Unable to connect to the API";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getEpisodes() {
    this.http.get<Episode[]>(
      this.episodesUrl
    ).subscribe(
      (episodes: Episode[]) => {
        this.episodes.next(episodes);
      },
      err => {
        console.error(err);
      }
      );
  }

  insertEpisodes(episodes: Episode[]) {
    this.http.post<any>( // TODO: type?
      this.episodesUrl + `/new-many`,
      { episodes: episodes },
      this.httpOptions
    ).subscribe(
      (res: any) => { // TODO: type?
        this.serverResponse.next(res);
      },
      error => {
        console.error(error);
        this.serverResponse.next(error);
      }
      );
  }

  updateEpisode(episode: Episode) {
    this.http.put<any>( // TODO: type?
      this.episodesUrl + `/${episode._id}`,
      { episode: episode },
      this.httpOptions
    ).subscribe(
      (res: any) => { // TODO: type?
        this.serverResponse.next(res);
      },
      error => {
        console.error(error);
        this.serverResponse.next(error);
      }
      );
  }
}
