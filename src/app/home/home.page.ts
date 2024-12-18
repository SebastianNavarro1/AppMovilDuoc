import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  
    if (loggedInUser && loggedInUser.nombre_completo) {
      this.username = loggedInUser.nombre_completo; 
    } else {
      this.route.queryParams.subscribe(params => {
        if (params['username']) {
          this.username = params['username'];
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn'); 
    this.navCtrl.navigateRoot('/login');
  }
  
  gotoobjetos() {
    this.navCtrl.navigateForward('/objetos');
  }

  gotosubir() {
    this.navCtrl.navigateForward('/subir');
  }

  ionViewWillEnter() {
    console.log('Se ocupó el ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Se ocupó el ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Se ocupó el ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Se ocupó el ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Se ocupó el ngOnDestroy');
  }
}
