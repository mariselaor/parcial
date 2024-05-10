import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppUserModalComponent } from 'src/app/shared/components/app-user-modal/app-user-modal.component';
import { UserService } from 'src/app/services/user.service'; // Asegúrate de importar el servicio UserService

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users: any[] = []; // Inicializa el array de usuarios

  constructor(private modalController: ModalController, private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Cargar usuarios al inicializar la página
  }

  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AppUserModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        // Agrega el nuevo usuario al array de usuarios
        this.users.push(result.data);
      }
    });

    return await modal.present();
  }

  loadUsers() {
    // Suscribirse al observable para obtener los usuarios
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }
}
