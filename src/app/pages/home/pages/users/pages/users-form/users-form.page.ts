import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { UserService } from '../../../../../../services';
import { User } from '../../../../../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
})
export class UsersFormPage implements OnInit {
  title: string;
  userForm: FormGroup;
  id: string | null;
  roles: string[] = ['Adminitrador', 'Usuario'];

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private _userServices: UserService,
    private _ar: ActivatedRoute,
  ) { 
    this.title = 'Nuevo usuario';
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.id = this._ar.snapshot.paramMap.get("id");
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  userFormFunctions(): void{
    if (this.id === null) {
      this.create();
    } else {
      this.edit(this.id);
    }
  }

  async create(): Promise<void> {
    console.log(this.userForm.value);
    const loading = await this.loadingController.create();
    await loading.present();

    let data: User = {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
    };

    const USER = await this._userServices.create(data);

    await loading.dismiss();

    if (USER) {
      this.router.navigateByUrl('/home/users/list', { replaceUrl: true });
    } else {
      this.showAlert('Registro fallido', 'por favor intentalo nuevamente');
    }
  }

  async edit(id: string) {}

}
