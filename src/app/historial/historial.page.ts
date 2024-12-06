import { Component, OnInit } from '@angular/core';
import { supabase } from 'supabase.service'; // Asegúrate de importar tu servicio de Supabase

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = []; // Propiedad para almacenar los datos del historial

  constructor() {}

  ngOnInit() {
    this.loadHistorial();
  }

  async loadHistorial() {
    try {
      // Primero obtenemos todos los registros del historial
      const { data, error } = await supabase
        .from('historial')
        .select('id_historial, id_objeto, rut_usuario, entregado_a, descripcion, sala_encontrada');

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
            .single(); // Utilizamos single() ya que se espera un único usuario

          if (usuarioError) {
            console.error('Error al obtener datos del usuario:', usuarioError);
            return item; // Si no se puede obtener el usuario, devolvemos el item original sin datos del usuario
          }

          const { data: carreraData, error: carreraError } = await supabase
          .from('carrera') // Cambié 'carreras' por 'carrera' ya que ese es el nombre de tu tabla
          .select('descripcion') // Obtenemos solo la descripcion
          .eq('id_carrera', usuarioData.carrera) // Usamos el campo 'carrera' (que es id_carrera) del usuario
          .single(); // Solo esperamos una carrera con ese ID

        if (carreraError) {
          console.error('Error al obtener la descripción de la carrera:', carreraError);
          return item; // Si no se puede obtener la descripción, devolvemos el item con los datos de usuario pero sin la descripción de carrera
        }

        // Agregamos los datos del usuario y la descripción de la carrera al objeto del historial
        return {
          ...item,
          usuario: {
            ...usuarioData,
            carrera_descripcion: carreraData.descripcion, // Añadimos la descripción de la carrera
          },
        };
      })
    );

    // Asignamos los datos combinados (historial + usuario + carrera) a la propiedad historial
    this.historial = historialConUsuarios;

  } catch (error) {
    console.error('Error al cargar el historial con datos de usuario y carrera:', error);
  }
}
}
