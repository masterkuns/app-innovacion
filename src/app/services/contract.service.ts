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
      const contracts = await new Promise<any>((resolve) => {
        this._afs.collection('contracts').valueChanges({ idField: id }).subscribe(users => resolve(users));
      })
      return contracts;
    } catch (error) {
      return null;
    }
  }

  async delete(id) {
    try {
      const contracts = await new Promise<any>((resolve) => {
        this._afs.collection('contracts').valueChanges({ idField: 'id' }).subscribe(users => resolve(users));
      })
      return contracts;
    } catch (error) {
      return null;
    }
  }
}
