import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  role: string | void;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authServices: AuthService,
    private router: Router,
  ) {
    this.role = '';
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  getUsername() {
    return this.credentials.get('username');
  }

  getPassword() {
    return this.credentials.get('password');
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authServices.register(this.credentials.value);

    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Registro fallido', 'por favor intentalo nuevamente');
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const USER = await this.authServices.login(this.credentials.value);

    //console.log(uid);

    await loading.dismiss();
    
    if (USER) {
      //console.log(USER);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Login fallido', 'por favor intentalo nuevamente');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
