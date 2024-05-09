import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DocumentData } from '@angular/fire/compat/firestore'; 

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    @Inject(FirebaseService) private firebaseSvc: FirebaseService,
    @Inject(UtilsService) private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.value.email;
      const password = this.form.value.password;

      // Verificar que los valores de email y password no sean nulos ni indefinidos
      if (email && password) {
        this.firebaseSvc.signIn({
          email, password,
          uid: '',
          name: '',
          image: '',
          rol: ''
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
          })

        }).finally(() => {
          loading.dismiss();
        })
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
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

}
