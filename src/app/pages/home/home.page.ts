import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authServices: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async logout(){
    await this.authServices.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
