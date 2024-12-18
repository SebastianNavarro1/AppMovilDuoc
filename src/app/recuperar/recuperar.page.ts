import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { supabase } from 'supabase.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';
  nuevaContrasena: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async resetPassword() {
   
    const { data, error } = await supabase
      .from('usuarios')
      .update({ password: this.nuevaContrasena })
      .eq('email', this.email);

    if (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo restablecer la contraseña. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La contraseña se ha restablecido exitosamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateBack('/login'); 
    }
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
