import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  initialPages = [
    { title: 'Constancias', url: '/main/constancias', icon:'person-outline'},
   { title: 'Estado de Constancias', url: '/main/estados', icon:'star-half-outline'},
   { title: 'Perfil', url: '/main/profile', icon:'person-outline'},
  ]

  pages = [];

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';

  ngOnInit() {
    // Esto sigue aquí para asegurarse de que funcione correctamente al inicio.
    this.filterPagesBasedOnUserType();
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    });
  }

  // Esta función se llamará cada vez que la vista esté a punto de entrar.
  ionViewWillEnter() {
    this.filterPagesBasedOnUserType();
  }

  filterPagesBasedOnUserType() {
    const userType = this.user()?.tipo_u;
    if (userType === 'Registrador') {
      // Si es 'Registrador', excluye 'Estado de Constancias'
      this.pages = this.initialPages.filter(page => page.title !== 'Estado de Constancias');
    } else {
      this.pages = [...this.initialPages];
    }
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  
  signOut(){
    this.firebaseSvc.signOut();
  }
}
