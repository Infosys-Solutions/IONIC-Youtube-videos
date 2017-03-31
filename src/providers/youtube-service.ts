import { Injectable,NgZone } from '@angular/core';
import { Http,URLSearchParams,Response} from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';
import YouTubePlayer from 'youtube-player'; 
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {
 youtube: any = {
    ready: true,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '100%',
    playerWidth: '100%'
  }

  constructor () {
      this.setupPlayer();
  }

  bindPlayer(elementId): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    console.log('createPlayer');
    return new window.YT.Player(this.youtube.playerId, {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      }
    });
  }

onYouTubeIframeAPIReady()
{
  this.youtube.player = this.createPlayer(); 
}
  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
      this.youtube.player.destroy();
      }
      this.youtube.player = this.createPlayer();
    }
  }

  setupPlayer () {
    // in production mode, the youtube iframe api script tag is loaded
    // before the bundle.js, so the 'onYouTubeIfarmeAPIReady' has
    // already been triggered
    // TODO: handle this in build or in nicer in code
    console.log ("Running Setup Player");
    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
         console.log('Youtube API is ready');
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
      }
    };
    if (window.YT && window.YT.Player) {
            console.log('Youtube API is ready');
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
    }
  }

  launchPlayer(id, title):void {
    this.youtube.player.loadVideoById(id.videoId);
    this.youtube.videoId = id.videoId;
    this.youtube.videoTitle = title;
    return this.youtube;
  }

}
