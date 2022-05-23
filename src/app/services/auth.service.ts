import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register({username, password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, username, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  async login({username, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, username, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
