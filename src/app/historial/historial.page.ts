import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { supabase } from 'supabase.service'; // Asegúrate de importar tu servicio de Supabase
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = []; // Propiedad para almacenar los datos del historial

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadHistorial();
  }

  async loadHistorial() {
    try {
      // Primero obtenemos todos los registros del historial
      const { data, error } = await supabase
        .from('historial')
        .select(
          'id_historial, id_objeto, rut_usuario, entregado_a, descripcion, sala_encontrada'
        );

      if (error) {
        console.error('Error al cargar el historial:', error);
        return;
      }

      // Ahora, obtenemos los datos de los usuarios correspondientes al "entregado_a"
      const historialConUsuarios = await Promise.all(
        data.map(async (item) => {
          // Consulta para obtener los datos del usuario al que se entregó el objeto (usamos "entregado_a" que es el "rut" del usuario)
          const { data: usuarioData, error: usuarioError } = await supabase
            .from('usuarios')
            .select('nombre_completo, carrera')
            .eq('rut', item.entregado_a)
            .single(); 

          if (usuarioError) {
            console.error('Error al obtener datos del usuario:', usuarioError);
            return item; 
          }

          const { data: carreraData, error: carreraError } = await supabase
            .from('carrera')
            .select('descripcion') 
            .eq('id_carrera', usuarioData.carrera) 
            .single();

          if (carreraError) {
            console.error(
              'Error al obtener la descripción de la carrera:',
              carreraError
            );
            return item; 
          }

        
          return {
            ...item,
            usuario: {
              ...usuarioData,
              carrera_descripcion: carreraData.descripcion, 
            },
          };
        })
      );
      
      this.historial = historialConUsuarios;
    } catch (error) {
      console.error(
        'Error al cargar el historial con datos de usuario y carrera:',
        error
      );
    }
  }

  

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }
}
