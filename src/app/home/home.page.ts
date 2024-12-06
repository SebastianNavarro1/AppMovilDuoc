import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';  // Importamos Leaflet

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  map: any;  // Variable para el mapa

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}
  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  
    if (loggedInUser && loggedInUser.nombre_completo) {
      this.username = loggedInUser.nombre_completo;  // Usar el nombre del usuario almacenado
    } else {
      this.route.queryParams.subscribe(params => {
        if (params['username']) {
          this.username = params['username'];
        }
      });
    }
  
    this.loadMap();  
  }
  
  loadMap() {

    this.map = L.map('map').setView([-41.47010673020358, -72.92584076092523], 13);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar un marcador
    L.marker([-41.47010673020358, -72.92584076092523]).addTo(this.map)
    .bindPopup('Duoc UC, Sede Puerto Montt')
    .openPopup();
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
  ngAfterViewInit() {
    setTimeout(() => {
      this.map.invalidateSize();  
    }, 500);
  }
ionViewWillEnter(){
  console.log('Se ocupo el ionViewWillEnter ')

}

ionViewDidEnter(){
 console.log('Se ocupo el ionViewDidEnter')
}

ionViewWillLeave(){
console.log('Se ocupo el ionViewWillLeave')
}
ionViewDidLeave(){
console.log('Se ocupo el ionViewDidLeave')
}
ngOnDestroy(){
console.log('Se ocupo el ngOnDestroy')
}








}