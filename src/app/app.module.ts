import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

<<<<<<< HEAD
// ======= FIREBASE =========
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// ======= PAGINATION =========
import {NgxPaginationModule} from 'ngx-pagination'; 


// ======= PDF ========
=======
// ========= Firebase =========
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

@NgModule({
  declarations: [AppComponent],
  imports: [
<<<<<<< HEAD
    BrowserModule, 
    IonicModule.forRoot({mode: 'ios'}), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxPaginationModule,
=======
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
<<<<<<< HEAD
export class AppModule {}
=======
export class AppModule { }
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
