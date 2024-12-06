import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  audio!: HTMLAudioElement;  // Usamos el operador '!' para indicar que será inicializada más tarde

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
    this.audio = new Audio('assets/musica/Megalovania.mp3'); // Crea el objeto Audio
    this.audio.play();  // Inicia la reproducción
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();  // Pausa la reproducción
      this.audio.currentTime = 0;  // Reinicia el audio al principio
    }
  }

  ionViewWillLeave() {
    // Detener el audio cuando la página se destruya (cuando navegas fuera de la página)
    this.stopAudio();
  }
}
