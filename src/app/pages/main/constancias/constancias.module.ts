import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConstanciasPageRoutingModule } from './constancias-routing.module';
import { ConstanciasPage } from './constancias.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstanciasPageRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [
    EmailComposer,
    // ... otros proveedores
  ],
  declarations: [ConstanciasPage]
})
export class ConstanciasPageModule {}
