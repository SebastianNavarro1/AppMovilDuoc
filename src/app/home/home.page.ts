import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  previewImage: string | null = null;

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      this.previewImage = photo.webPath || null;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      alert('No se pudo tomar la foto.');
    }
  }
}
