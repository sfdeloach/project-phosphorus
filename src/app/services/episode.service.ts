import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Episode } from '../models/episode.model';
import { Result } from '../models/result.model';

@Injectable()
export class EpisodeService {
  episodes: Subject<Episode[]> = new Subject();
  serverResponse: Subject<Result> = new Subject();
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

  uploadEpisodes(episodes: Episode[]) {
    // TODO: Compare episodes on the db, upsert any docs that are not the same
    console.log("TODO: implement upload/upsert functions");
    this.updateEpisode(episodes[0]);
  }

  updateEpisode(episode: Episode) {
    this.http.put<Result>(
      this.episodesUrl + `/${episode._id}`,
      { episode: episode },
      this.httpOptions
    ).subscribe(
      (res: Result) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "Unable to connect to the API";
        console.error(error);
        this.serverResponse.next(new Result(true, errMessage, 0));
      }
    );
  }

}
