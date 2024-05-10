import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController);


  // ============ Alert ============
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  // ============ Loading ============
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ============ Toast ============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ============ Enruta a cualquier página disponible ============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }


  // ============ Guarda un elemento en localstorage ============
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ============ Obtiene un elemento desde localStorage ============
getFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  try {
    return item !== null && item !== undefined ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error al analizar el valor del localStorage:', error);
    return null;
  }
}


  // ============ Modal ============
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }
}
