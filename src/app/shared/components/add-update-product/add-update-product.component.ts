import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { formatDate } from '@angular/common';
import { Timestamp } from '@firebase/firestore';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product;

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl(null, [Validators.required, Validators.min(0)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(15)]),
    cantidad: new FormControl(null, [Validators.required, Validators.min(0)]),
    tipo: new FormControl(''),
    // Agrega un campo para la fecha y hora
    fechaCreacion: new FormControl(null),
    estado: new FormControl(''),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.product) {
      const tempProduct = {
        uid: '', // Agrega una propiedad 'uid' vacía
        name: '',
        email: '',
        telefono: '',
        descripcion: '',
        cantidad: '',
        tipo: '',
        // Agrega un campo para la fecha y hora
        fechaCreacion: '',
        estado: '',
      };

      // Copia los valores de 'this.product' al objeto temporal
      Object.assign(tempProduct, this.product);

      this.form.setValue(tempProduct);
    }
  }

  submit() {
    if (this.form.valid) {
      // Agrega la fecha y hora actual al campo 'fechaCreacion'
      this.form.get('fechaCreacion').setValue(Timestamp.fromDate(new Date()));
      if (this.product) this.updateProduct();
      else this.createProduct();
    }
  }

  setNumberInputs(){
    let { telefono } = this.form.controls;
    if(telefono.value) telefono.setValue(parseFloat(telefono.value));
    
  }

  //============ CREAR PRODUCTO ==============

  async createProduct(){

      let path = `constancias`;

      const loading = await this.utilsSvc.loading();
      await loading.present();
       delete this.form.value.uid;

       

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dissmisModal({success: true});
        this.utilsSvc.presentToast({
          message: 'Constancia creada exitosamente!',
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

   //============ ACTUALIZAR PRODUCTO ==============

  async updateProduct(){

      let path = `constancias/${this.product.id}`;

      const loading = await this.utilsSvc.loading();
      await loading.present();

       //============ Si cambio la imagen, subir la nueva y obtener URL ==============
      
       
       delete this.form.value.uid;

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dissmisModal({success: true});
        this.utilsSvc.presentToast({
          message: 'Constancia actualizada exitosamente!',
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



}
