import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  audio!: HTMLAudioElement; 

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.playAudio();
    }, 4200);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

  playAudio() {
    this.audio = new Audio('assets/musica/Megalovania.mp3'); 
    this.audio.play();  
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause(); 
      this.audio.currentTime = 0; 
    }
  }

  ionViewWillLeave() {
    
    this.stopAudio();
  }
}
