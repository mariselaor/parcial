import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  rolesOptions = ['Administrador', 'Usuario'];

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rol: new FormControl('', [Validators.required]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      try {
        const res = await this.firebaseSvc.signUp(this.form.value as User);
        const name = this.form.value.name;
        const rol = this.form.value.rol;

        if (name !== null && name !== undefined) {
          await this.firebaseSvc.updateUser(name);
        }

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        if (rol !== null && rol !== undefined) {
          this.setUserInfo(uid, rol);
        }
      } catch (error: any) {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      } finally {
        loading.dismiss();
      }
    }
  }

  async setUserInfo(uid: string, rol: string) {
    const rolesMapping = {
      'Administrador': 'admin',
      'Usuario': 'user'
    };

    const selectedRole = rolesMapping[rol as keyof typeof rolesMapping];

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `users/${uid}`;
    delete this.form.value.password;
    this.form.value.rol = selectedRole;

    try {
      await this.firebaseSvc.setDocument(path, this.form.value);

      this.utilsSvc.saveInLocalStorage('user', this.form.value);
      const redirectRoute = selectedRole === 'admin' ? '/main/admin' : '/main/home';
      this.utilsSvc.routerLink(redirectRoute); // Redirigir según el rol
      
      this.form.reset();
    } catch (error: any) {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      });

    } finally {
      loading.dismiss();
    }
  }

}
