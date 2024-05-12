import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// ======= FIREBASE =========
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// ======= PAGINATION =========
import {NgxPaginationModule} from 'ngx-pagination'; 


// ======= PDF ========

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({mode: 'ios'}), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxPaginationModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
