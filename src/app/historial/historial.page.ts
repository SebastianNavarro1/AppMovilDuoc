import { Component, OnInit } from '@angular/core';
import { supabase } from 'supabase.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadHistorial();
  }

  async loadHistorial() {
    try {
      
      const { data, error } = await supabase
        .from('historial')
        .select(
          'id_historial, id_objeto, rut_usuario, entregado_a, hora_entrega, activo'
        )
        .eq('activo', false); 

      if (error) {
        console.error('Error al cargar el historial:', error);
        return;
      }

      const historialCompleto = await Promise.all(
        data.map(async (item) => {
          
          const formattedHoraEntrega = this.formatFecha(item.hora_entrega);

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
            console.error('Error al obtener la descripción de la carrera:', carreraError);
            return item;
          }

          const { data: objetoData, error: objetoError } = await supabase
            .from('objetos_perdidos')
            .select('foto')
            .eq('id_objeto', item.id_objeto)
            .single();

          if (objetoError) {
            console.error('Error al obtener la foto del objeto:', objetoError);
          }

          return {
            ...item,
            usuario: {
              ...usuarioData,
              carrera_descripcion: carreraData.descripcion,
            },
            foto: objetoData?.foto,
            hora_entrega: formattedHoraEntrega, 
          };
        })
      );

     
      this.historial = historialCompleto.sort((a, b) => {
        const dateA = new Date(a.hora_entrega).getTime();
        const dateB = new Date(b.hora_entrega).getTime();
        return dateA - dateB; 
      });
    } catch (error) {
      console.error('Error al cargar el historial completo:', error);
    }
  }

  
  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleString('es-CL', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
    });
  }
}
