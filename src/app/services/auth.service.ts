import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  public async register({username, password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, username, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  public async login({username, password}) {
    try {
      const USER = await signInWithEmailAndPassword(this.auth, username, password);
      return USER;
    } catch (error) {
      return null;
    }
  }

  public logout() {
    return signOut(this.auth);
  }

  public async stateUser(){
    try{
      const STATE = await authState(this.auth);
      return STATE;
    }catch (error){
      return error;
    }
  }
}
