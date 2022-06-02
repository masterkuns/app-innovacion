import { Injectable } from '@angular/core';
import { User } from '../models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _afs: AngularFirestore) { }

  async create(data: User, id: any) {
    try {
      //const contract = await this._afs.collection('users').add(data);
      await this._afs.collection('users').doc(id).set(data);
      const contract = await this._afs.collection('users').doc(id).get();
      return contract;
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    try {
      return await this._afs.collection('users').snapshotChanges();
    }
    catch (error) {
      return null;
    }
  }

  async getById(id) {
    try {
      return await this._afs.collection('users').doc(id).get();
    } catch (error) {
      console.log("error en: getById ", error)
    }
  }

  async update(id: string, data: any): Promise<any> {
    return this._afs.collection('users').doc(id).update(data);
  }
}