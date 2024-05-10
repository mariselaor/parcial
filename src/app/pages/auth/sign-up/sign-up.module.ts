import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Agrega esta importación
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule, // Agrega IonicModule aquí
    ReactiveFormsModule,
    SignUpPageRoutingModule,
    SharedModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
