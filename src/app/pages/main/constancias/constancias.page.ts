import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, Inject, Renderer2 , ElementRef} from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy } from 'firebase/firestore';
import { Observable, Subscription, of } from 'rxjs'; // Importamos Subscription
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject

import { map } from 'rxjs/operators';

import { AlertController, Platform } from '@ionic/angular';

//PDF
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//Correo
import { HttpClient } from '@angular/common/http';

//Grafica
import { formatDate } from '@angular/common';

//Correo
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.page.html',
  styleUrls: ['./constancias.page.scss'],
})
export class ConstanciasPage implements OnInit, OnDestroy { // Implementamos OnDestroy

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  alertController = inject(AlertController);
  constancias: Product[] = [];
  products: Product[] = [];
  loading: boolean = false;
  page: number = 1;
  private subscription: Subscription; // Declaramos la propiedad

  //Validacion de usuario
  currentUserType$ = new BehaviorSubject<string>(this.user().tipo_u);

  //Correo
  emailComposer = inject(EmailComposer);
  platform = inject(Platform);

  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.subscription = this.getProducts();
    this.updateUserType();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ionViewDidEnter() {  // Usando el ciclo de vida de Ionic
    this.updateUserType();  // Refrescar el tipo de usuario cada vez que se entra a la página.
  }

  updateUserType() {
    const userType = this.user()?.tipo_u;
    if (userType) {
      this.currentUserType$.next(userType);
    }
    this.cd.detectChanges();
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  getProducts(){
    let path = `constancias`;
    this.loading = true;
    let query = (
      orderBy('name', 'asc')
    )
    return this.firebaseSvc.getCollectionData(path, query).subscribe({
      next : (res: any) => {
        console.log(res);
        this.constancias = res;
        this.loading = false;

      }
    })
  }

  async addUpdateProduct(product?: Product){
    let success = await this.utilsSvc.presentModal({
      component : AddUpdateProductComponent,
      cssClass : 'add-update-product',
      componentProps: {product}
    })

    if(success) this.getProducts();
  }

  async confirmDeleteProduct(product: Product){
    this.utilsSvc.presentAlert({
      header: 'Eliminar Constancia',
      message: '¿Quieres eliminar esta constancia?',
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel',
          cssClass: 'secundary',
          handler: () => {
            console.log('Confirm cancel: blah');
          }
        },
        {
          text:'Eliminar',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });
  }

  async deleteProduct(product: Product){

    let path = `constancias/${product.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products = this.products.filter(c => c.id !== product.id);

      this.utilsSvc.presentToast({
        message: 'Constancia eliminada exitosamente!',
        duration: 1500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-outline'
      });
      this.getProducts();  // <-- Refrescamos los datos después de eliminar un producto

    }).catch(error => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: 'ERROR',
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
    }).finally(() => {
      loading.dismiss();
    });
  }

  ngOnDestroy() { // Método para limpiar la suscripción
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  //GENERAR PDF

  generatePDF() {
    let header = ['UID', 'Nombre', 'Email', 'Teléfono', 'Descripción', 'Cantidad', 'Tipo', 'Fecha Creación', 'Estado'];
    let data = [];

    this.constancias.forEach(product => {
        let rowData = [
            product.id,
            product.name,
            product.email,
            product.telefono,
            product.descripcion,
            product.cantidad,
            product.tipo,
            product.fechaCreacion ? formatDate(product.fechaCreacion.toDate(), 'dd/MM/yyyy', 'en-US') : '',
            product.estado
        ];
        data.push(rowData);
    });

    // Combine the header array with the data array
    let content = [header, ...data];
    let docDefinition = {
      content: [
          { text: 'Lista de Constancias', style: 'header', alignment: 'center' },
          {
              layout: 'lightHorizontalLines', // optional
              table: {
                  headerRows: 1,
                  body: content
              }
          }
      ],
      styles: {
          header: {
              fontSize: 22,
              bold: true,
              margin: [0, 0, 0, 10]  // left, top, right, bottom
          }
      },
      pageOrientation: 'landscape'
  };

  pdfMake.createPdf(docDefinition).open();
  }

  enviarCorreo(constancia: Product) {
    if (this.platform.is('cordova')) {
      let email = {
        to: constancia.email,
        subject: 'Constancia Recibida',
        body: 'Hemos recibido la constancia exitosamente',
        isHtml: true
      };

      this.emailComposer.open(email);
    } else {
      // Usar Gmail en navegadores web
      let encodedSubject = encodeURIComponent('Constancia Recibida');
      let encodedBody = encodeURIComponent('Hemos recibido la constancia exitosamente');
      let gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${constancia.email}&su=${encodedSubject}&body=${encodedBody}&bcc=`;

      window.open(gmailUrl, '_blank');
    }
  }
}
