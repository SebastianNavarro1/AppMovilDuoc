import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'js-sha256';

interface Carrera {
  id_carrera: number;
  descripcion: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  Usuario = {
    rut: '',
    nombre_completo: '',
    carrera: '',
    email: '',
    password: '',
    tipo_usuario: 2  
  };
  carreras: Carrera[] = []; 

  private supabase = createClient('https://rphpxwnpbulwhnhaapeu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHB4d25wYnVsd2huaGFhcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzMzODMsImV4cCI6MjA0NTIwOTM4M30.w8vhc96ABfuEytJS3yt_e4k0WtgG-k-2iG4tiBWLbEc');

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.loadCarreras();
  }

  async loadCarreras() {
    try {
      const { data, error } = await this.supabase.from('carrera').select('*');
      if (error) {
        throw error;
      }
      this.carreras = data as Carrera[];
    } catch (error) {
      console.error('Error al cargar las carreras:', error);
    }
  }

  async Registrar() {
    try {

      if (!this.Usuario.rut || !this.Usuario.nombre_completo || !this.Usuario.carrera || !this.Usuario.email || !this.Usuario.password) {
        await this.mostrarAlerta('Error', 'Todos los campos son obligatorios.');
        return;
      }
  
 
      const rutValido = /^[0-9]{7,8}-[0-9Kk]$/.test(this.Usuario.rut);
      if (!rutValido) {
        await this.mostrarAlerta('Error', 'Formato de RUT inválido. Debe ser en formato 12345678-9.');
        return;
      }
  
      
      const correoValido = /^[a-zA-Z0-9._%+-]+@(duocuc|duoc)\.cl$/.test(this.Usuario.email);
      if (!correoValido) {
        await this.mostrarAlerta('Error', 'El correo debe pertenecer a los dominios @duocuc.cl o @duoc.cl.');
        return;
      }
  

      if (this.Usuario.password.length < 6) {
        await this.mostrarAlerta('Error', 'La contraseña debe tener al menos 6 caracteres.');
        return;
      }
  
  
      const { data: usuarioExistente, error: errorConsulta } = await this.supabase
        .from('usuarios')
        .select('rut, correo')
        .or(`rut.eq.${this.Usuario.rut},correo.eq.${this.Usuario.email}`)
        .single();
  
      if (errorConsulta && errorConsulta.code !== 'PGRST116') { 
        throw errorConsulta;
      }
  
      if (usuarioExistente) {
        const mensajeError = usuarioExistente.rut === this.Usuario.rut
          ? 'El RUT ingresado ya está registrado.'
          : 'El correo ingresado ya está registrado.';
        await this.mostrarAlerta('Error', mensajeError);
        return;
      }
  
   
      const hashedPassword = sha256(this.Usuario.password);
  
      const { data, error } = await this.supabase
        .from('usuarios')
        .insert([{
          rut: this.Usuario.rut,
          nombre_completo: this.Usuario.nombre_completo,
          carrera: this.Usuario.carrera,
          correo: this.Usuario.email,
          contraseña: hashedPassword,
          tipo_usuario: this.Usuario.tipo_usuario
        }]);
  
      if (error) {
        console.error('Error al insertar usuario en Supabase:', error.message);
        throw error;
      }

      await this.mostrarAlerta('Registrado', 'Usuario registrado con éxito.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Detalle del error:', error);
      await this.mostrarAlerta('Error', 'Hubo un problema con el registro. Inténtalo nuevamente.');
    }
  }
  
  

  goToLogin() {
    this.router.navigate(['/login']);
  }


  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
