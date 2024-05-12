import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
<<<<<<< HEAD
import { SharedModule } from 'src/app/shared/shared.module';
=======
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    MainPageRoutingModule,
    SharedModule
=======
    MainPageRoutingModule
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
