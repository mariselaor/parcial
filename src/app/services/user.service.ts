import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  // Registro de usuarios
  async signUp(email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  // Inicio de sesión de usuarios
  async signIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  // Cierre de sesión de usuarios
  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // Obtención de información de usuario
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // Actualización de la información del usuario
  async updateProfile(displayName: string) {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName
        });
      }
    } catch (error) {
      throw error;
    }
  }

  // Eliminación de usuarios
  async deleteUser() {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.delete();
      }
    } catch (error) {
      throw error;
    }
  }

  // Obtener lista de usuarios desde Firestore
  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  // Verificación de roles y permisos
  // Aquí podrías implementar lógica para verificar roles y permisos

}
