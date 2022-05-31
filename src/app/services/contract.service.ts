import { Injectable } from '@angular/core';
import { Contract } from '../models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private _afs: AngularFirestore) { }

  async create(data: Contract) {
    try {
      const contract = await this._afs.collection('contracts').add(data);
      return contract;
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    try {
      return await this._afs.collection('contracts').snapshotChanges();
    }
    catch (error) {
      return null;
    }
  }

  async getById(id) {
    try {
      return await this._afs.collection('contracts').doc(id).get();
    } catch (error) {
      console.log("error en: getById ", error)
    }
  }

  async update(id: string, data: any): Promise<any> {
    return this._afs.collection('contracts').doc(id).update(data);
  }
}
