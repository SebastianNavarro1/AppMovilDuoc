import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { supabase } from 'supabase.service'; 

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.page.html',
  styleUrls: ['./objetos.page.scss'],
})
export class ObjetosPage implements OnInit {
  objetos: any[] = [];

  constructor(private navCtrl: NavController) {}

  
  logout() {
    
    localStorage.removeItem('loggedInUser');

    
    this.navCtrl.navigateRoot('/login');
  }
  async ngOnInit() {
    await this.cargarObjetos(); 
  }

  async cargarObjetos() {
    const { data, error } = await supabase
      .from('objetos_perdidos')
      .select('id_objeto, nombre_objeto, descripcion, foto')
      .eq('activo', true);
  
    if (error) {
      console.error('Error al cargar objetos:', error);
    } else {
      this.objetos = data; 
    }
  }
    
}

