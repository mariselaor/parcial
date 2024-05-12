import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadosPageRoutingModule } from './estados-routing.module';

import { EstadosPage } from './estados.page';

import { SharedModule } from 'src/app/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadosPageRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgChartsModule,
    HttpClientModule
  ],
  declarations: [EstadosPage]
})
export class EstadosPageModule {}
