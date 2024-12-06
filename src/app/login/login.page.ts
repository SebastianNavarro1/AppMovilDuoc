import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { supabase } from 'supabase.service';
import { sha256 } from 'js-sha256'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  Usuario = {
    correo: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async Ingresar() {
    const hashedPassword = sha256(this.Usuario.password);

    const { data: users, error } = await supabase
      .from('usuarios')
      .select('*, tipo_usuario(id_tipo_usuario)') // Seleccionar el campo id_tipo_usuario de la relación Tipo_usuario
      .eq('correo', this.Usuario.correo)
      .eq('contraseña', hashedPassword);  

    if (users && users.length > 0) {
      const user = users[0];
      console.log('Usuario encontrado: ', user); // Verifica qué campos están llegando

      // Guardar los datos del usuario, incluyendo el id_tipo_usuario
      localStorage.setItem('loggedInUser', JSON.stringify({
        rut: user.rut,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        id_tipo_usuario: user.tipo_usuario.id_tipo_usuario // Acceder correctamente al id_tipo_usuario
      }));
      localStorage.setItem('isLoggedIn', 'true');

      // Redirigir según el tipo de usuario
      if (user.tipo_usuario.id_tipo_usuario === 1) {
        this.navCtrl.navigateForward('/admintabs');
      } else {
        this.navCtrl.navigateForward('/tabs');
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos. Por favor, verifica tus datos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/registro');
  }

  goToRecuperar() {
    this.navCtrl.navigateForward('/recuperar');
  }
}
