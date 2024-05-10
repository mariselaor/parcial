import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, query, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private firebaseSvc: AngularFirestore,
    private storage: AngularFireStorage,
    private utilsSvc: UtilsService
  ) {}

  // ================= Autenticación =================

  // ======= Acceder =======
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ======= Crear Usuario =======
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ======= Actualizar Usuario =======
  updateUser(displayName: string) {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      return updateProfile(currentUser, { displayName });
    } else {
      return Promise.reject(new Error('No hay usuario actualmente logueado.'));
    }
  }

  // ======= Enviar email para restablecer contraseña =======
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ======= Cerrar Sesión =======
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }


  // ============== Base de Datos ==============

  // ======= Obtener documentos de una coleccion =======
  async getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    const queryRef = query(ref, ...collectionQuery);
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // ======= Setear un documento =======
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // ======= Actualizar un documento =======
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  // ======= Eliminar un documento =======
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  // ======= Obtener un documento =======
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // ======= Agregar un documento =======
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
}
