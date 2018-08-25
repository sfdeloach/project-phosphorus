import { Component, OnInit, OnDestroy } from '@angular/core';
import { EpisodeHttpService } from '../../../services/episode.http.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-wipe-episodes',
  templateUrl: './wipe-episodes.component.html',
  styleUrls: ['./wipe-episodes.component.css']
})
export class WipeEpisodesComponent implements OnInit, OnDestroy {
  message: Message;
  subMessage: Subscription;

  constructor(private episodeHttpService: EpisodeHttpService) {}

  ngOnInit() {
    this.subMessage = this.episodeHttpService.message.subscribe((message: Message) => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subMessage.unsubscribe();
  }

  wipeEpisodes() {
    this.episodeHttpService.wipeEpisodes();
  }
}
