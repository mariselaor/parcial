import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular'; // Importa el ModalController

@Component({
  selector: 'app-tu-componente',
  templateUrl: './tu-componente.component.html',
  styleUrls: ['./tu-componente.component.css']
})
export class TuComponenteComponent {

  constructor(private firestore: AngularFirestore, private modalController: ModalController) { } // Agrega el ModalController al constructor

  guardarConstancia() {
    // Aquí defines los datos de la constancia que quieres guardar
    const constanciaData = {
      // Aquí van los datos de la constancia
    };

    // Guardar la constancia en la colección "constancias" de Firestore
    this.firestore.collection('constancias').add(constanciaData)
      .then((docRef) => {
        console.log("Constancia guardada con ID: ", docRef.id);
        // Aquí puedes agregar cualquier lógica adicional después de guardar la constancia
      })
      .catch((error) => {
        console.error("Error al guardar la constancia: ", error);
        // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }
}
