<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
=======
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DocumentData } from '@angular/fire/compat/firestore';
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
<<<<<<< HEAD
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),
    tipo_u: new FormControl(''),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
=======
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]), // Agrega los campos adicionales que necesites para el formulario
    rol: new FormControl('', [Validators.required]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

  ngOnInit() {
  }

<<<<<<< HEAD
  async submit(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.name);
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Usuario y contraseña son incorrectos',
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

  async setUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
       this.utilsSvc.saveInLocalStorage('user',this.form.value);
       this.utilsSvc.routerLink('/main/constancias');
       this.form.reset();
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Usuario y contraseña son incorrectos',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
=======
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.value.email;
      const password = this.form.value.password;

      // Verificar que los valores de email y password no sean nulos ni indefinidos
      if (email && password) {
        // Corregir el método signIn para que reciba un objeto de tipo User
        this.firebaseSvc.signIn({
          email, password, uid: '', name: '', image: '', rol: '',
          edad: 0,
          telefono: 0,
          descripcion: '',
          cantidad: 0
        }).then(res => {
          this.getUserInfo(res.user.uid);
        }).catch(error => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });

        }).finally(() => {
          loading.dismiss();
        });
      }
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      let path = `users/${uid}`;
      this.firebaseSvc.getDocument(path).then((user: DocumentData | undefined) => {
        if (user) {
          this.utilsSvc.saveInLocalStorage('user', user);

          // Accedemos a las propiedades usando notación de corchetes
          if (user['rol'] === 'admin') {
            this.utilsSvc.routerLink('/main/home');
          } else if (user['rol'] === 'user') {
            this.utilsSvc.routerLink('/main/docente');
          } else {
            // Manejar caso cuando el rol no es válido
          }

          this.form.reset();
          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user['name']}`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
        } else {
          // Manejar el caso cuando el usuario no existe
        }
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

<<<<<<< HEAD
}
=======
}
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
