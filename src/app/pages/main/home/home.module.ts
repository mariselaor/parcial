import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
<<<<<<< HEAD
import {NgxPaginationModule} from 'ngx-pagination';
=======
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
<<<<<<< HEAD
    SharedModule,
    NgxPaginationModule
=======
    SharedModule
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
