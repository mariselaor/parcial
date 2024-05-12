import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

=======
import { IonicModule } from '@ionic/angular'; // Agrega esta importación
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
<<<<<<< HEAD
    FormsModule,
    IonicModule,
=======
    IonicModule, // Agrega IonicModule aquí
    ReactiveFormsModule,
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
    SignUpPageRoutingModule,
    SharedModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
