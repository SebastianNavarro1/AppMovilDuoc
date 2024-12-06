import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { supabase } from 'supabase.service';

@Component({
  selector: 'app-admino',
  templateUrl: './admino.page.html',
  styleUrls: ['./admino.page.scss'],
})
export class AdminoPage implements OnInit {
  objetos: any[] = [];
  historial: any[] = [];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  async ngOnInit() {
    await this.cargarObjetos();
    await this.cargarHistorial();
  }

  async cargarObjetos() {
    const { data, error } = await supabase
      .from('objetos_perdidos')
      .select('id_objeto, nombre_objeto,sala_encontrada,hora_encontrada, descripcion, foto, activo')
      .eq('activo', true);

    if (error) {
      console.error('Error al cargar objetos:', error);
    } else {
      this.objetos = data;
    }
  }

  async cargarHistorial() {
    const { data, error } = await supabase
      .from('historial')
      .select(`
        id_objeto,
        entregado_a,
        usuarios:entregado_a (nombre_completo, carrera)
      `);

    if (error) {
      console.error('Error al cargar historial:', error);
    } else {
      this.historial = data;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }

  async entregarObjeto(objeto: any) {
    const id_objeto = objeto.id_objeto; // Extraer el ID numérico del objeto
    console.log('ID del objeto recibido:', id_objeto);
  
    if (!id_objeto || typeof id_objeto !== 'number') {
      console.error('El ID del objeto no es válido:', id_objeto);
      return;
    }
  
    const alert = await this.alertCtrl.create({
      header: 'Entregar Objeto',
      inputs: [
        {
          name: 'rut',
          type: 'text',
          placeholder: 'Ingrese el RUT del receptor',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Entrega cancelada');
          },
        },
        {
          text: 'Entregar',
          handler: async (data) => {
            if (!data.rut) {
              console.error('Debe ingresar un RUT válido.');
              return false;
            }
  
            // Validar si el RUT pertenece a un usuario
            const { data: usuario, error: usuarioError } = await supabase
              .from('usuarios')
              .select('nombre_completo, carrera')
              .eq('rut', data.rut)
              .single();
  
            if (usuarioError || !usuario) {
              console.error('Error al buscar el usuario con ese RUT:', usuarioError);
              return false;
            }
  
            // Actualizar en la tabla `historial`
            const { error: historialError } = await supabase
              .from('historial')
              .update({
                entregado_a: data.rut,
                activo: false,
              })
              .eq('id_objeto', id_objeto);
  
            if (historialError) {
              console.error('Error al actualizar el historial:', historialError);
              return false;
            }
  
            // Actualizar el estado del objeto
            const { error: objetoError } = await supabase
              .from('objetos_perdidos')
              .update({ activo: false })
              .eq('id_objeto', id_objeto);
  
            if (objetoError) {
              console.error('Error al actualizar estado del objeto:', objetoError);
              return false;
            }
  
            // Actualizar listas locales
            this.objetos = this.objetos.filter((obj) => obj.id_objeto !== id_objeto);
            await this.cargarHistorial();
  
            console.log(`Objeto con ID ${id_objeto} entregado y desactivado.`);
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  }
}   