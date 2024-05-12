import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy } from 'firebase/firestore';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  alertController = inject(AlertController);
  products: Product[] = [];
  loading: boolean = false;

  page = 1; // Página actual
  itemsPerPage = 10; // Cantidad de elementos por página

  ngOnInit() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
  }

  //============ Recargar pagina ===================
  doRefresh(event) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  //============ Obtener Cantidad total ===================
  getProfits(){
    return this.products.reduce((index,product) => index + product.telefono, 0);
  }

   //============ Obtener Productos ===================
   getProducts(){
    let path = `users/${this.user().uid}/products`;
    this.loading = true;
    let query = (
      orderBy('name', 'asc')
    )
    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
      next : (res: any) => {
        console.log(res);
        this.products = res;
        this.loading = false;
        sub.unsubscribe();
      }
    })

   }  

   //============ Agregar o actualizar producto ==================
   async addUpdateProduct(product?: Product){
    let success = await this.utilsSvc.presentModal({
      component : AddUpdateProductComponent,
      cssClass : 'add-update-product',
      componentProps: {product}
    })

    if(success) this.getProducts();
  }

  //=========== Confirmar eliminación del Producto ===================
  async confirmDeleteProduct(product: Product){ 
    this.utilsSvc.presentAlert({
      header: 'Eliminar Producto',
      message: '¿Quieres eliminar este producto?',
      buttons: [
        {
          text:'Cancelar' ,
          role: 'cancel',
          cssClass: 'secundary',
          handler: () => {
            console.log('Confirm cancel: blah');
          }
        },
        {
          text:'Eliminar' ,
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });
  }

  //============ Eliminar producto ==================
  async deleteProduct(product: Product){

    let path = `users/${this.user().uid}/products/${product.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products = this.products.filter(p => p.id !== product.id);

      this.utilsSvc.presentToast({
        message: 'Producto eliminado exitosamente!',
        duration: 1500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-outline'
      })

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

generatePDF() {
  const docDefinition = {
    pageOrientation: 'landscape',
    content: [
      { text: 'Lista de Productos', style: 'header' },
      '\n',
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Nombre', 'Precio', 'Cantidad', 'Descripción'],
            ...this.products.map(product => [product.id, product.name, product.price, product.telefono, product.descripcion]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
      },
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  // Genera un enlace oculto en el DOM
  pdfDocGenerator.getBlob((blob) => {
    const fileName = 'Lista_de_Productos.pdf';

    // Crea una URL de objeto para el blob
    const blobUrl = URL.createObjectURL(blob);

    // Obtiene el enlace de descarga oculto
    const downloadLink = document.getElementById('download-link') as HTMLAnchorElement;

    // Configura el enlace de descarga
    downloadLink.href = blobUrl;
    downloadLink.download = fileName;

    // Simula un clic en el enlace para iniciar la descarga
    downloadLink.click();

    // Revoca la URL del objeto para liberar recursos
    URL.revokeObjectURL(blobUrl);
  });
}


//============ Agregar Cantidad ===================

async addCantidad(product: Product) {
  const alert = await this.alertController.create({
    header: 'Agregar Cantidad',
    subHeader:`La cantidad actual es de: ${product.telefono}`,
    inputs: [
      {
        name: 'cantidad',
        type: 'number',
        placeholder: 'Cantidad',// Muestra la cantidad actual
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelar');
        },
      },
      {
        text: 'Guardar',
        handler: async (data) => {
          const cantidad = parseInt(data.cantidad, 10); // Convierte el valor a número
          if (!isNaN(cantidad)) {
            // Verifica si la cantidad ingresada es un número válido
            product.telefono += cantidad; // Agrega la cantidad ingresada al producto

            // Luego, actualiza el producto en la base de datos
            await this.firebaseSvc.updateDocument(
              `users/${this.user().uid}/products/${product.id}`,
              { soldUnits: product.telefono }
            );
            this.getProducts();

          } else {
            console.log('Cantidad no válida');
          }
        },
      },
    ],
  });

  await alert.present();
}

//============ Quitar Cantidad ===================

async removeCantidad(product: Product) {
  const alert = await this.alertController.create({
    header: 'Quitar Cantidad',
    subHeader:`La cantidad actual es de: ${product.telefono}`,
    inputs: [
      {
        name: 'cantidad',
        type: 'number',
        placeholder: 'Cantidad', // Muestra la cantidad actual
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelar');
        },
      },
      {
        text: 'Guardar',
        handler: async (data) => {
          const cantidad = parseInt(data.cantidad, 10); // Convierte el valor a número
          if (!isNaN(cantidad)) {
            // Verifica si la cantidad ingresada es un número válido
            product.telefono -= cantidad; // Resta la cantidad ingresada al producto

            // Luego, actualiza el producto en la base de datos
            await this.firebaseSvc.updateDocument(
              `users/${this.user().uid}/products/${product.id}`,
              { soldUnits: product.telefono }
            );
            this.getProducts();

          } else {
            console.log('Cantidad no válida');
          }
        },
      },
    ],
  });

  await alert.present();
}

}
