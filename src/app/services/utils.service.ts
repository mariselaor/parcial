import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController);

async takePictures(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Seleccione una imagen',
    promptLabelPicture: 'Toma una foto',
  });

};

//=========== ALERT ===================

async presentAlert(opts?: AlertOptions){
  const alert = await this.alertCtrl.create(opts);

  await alert.present();
}

  //=========== LOADING ===================

  loading(){
    return this.loadingCtrl.create({spinner: 'crescent'})
  }

  //============ TOAST ===================

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //============ Enruta a culaquier pagina disponible ===================
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //============ Guardar un elemento en localstorage ===================
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //============ Obtiene un elemento en localstorage ===================
  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  //============ MODAL ===================

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
  
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  
  }

  dissmisModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }
}