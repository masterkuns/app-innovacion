import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { ContractService } from '../../../../../../services';
import { Contract } from '../../../../../../models';

@Component({
  selector: 'app-contracts-form',
  templateUrl: './contracts-form.page.html',
  styleUrls: ['./contracts-form.page.scss'],
})
export class ContractsFormPage implements OnInit {
  title: string;
  editable: boolean;
  contractsForm: FormGroup;
  private _states: string[] = ['Celebrado', 'Anulado', 'Liquidar', 'Rechazado', 'Terminado', 'Terminación anticipada'];
  multiColumnOptions = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
  ];

  private _selectedDate: string;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private pc: PickerController,
    private _contractServices: ContractService,
  ) {
    this.title = 'Nuevo contrato';
    this.editable = false;
  }

  ngOnInit() {
    this.contractsForm = this.fb.group({
      id_contract: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      id_document: ['', [Validators.required]],
      state: ['', [Validators.required]],
      modality: ['', [Validators.required]],
      type: ['', [Validators.required]],
      expire: ['', [Validators.required]],
    })
  }

  async selectDate(numColumns = 3, numOptions = 31, columnOptions = this.multiColumnOptions) {
    const picker = await this.pc.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            //console.log(`Got Value ${value}`);
            //console.log(value['col-0'].text);
            //console.log(value['col-1'].text);
            //console.log(value['col-2'].text);
            this._selectedDate = `${value['col-0'].text}-${value['col-1'].text}-${value['col-2'].text}`;
            //console.log(this._selectedDate);
          },
        },
      ],
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }

    return options;
  }
  
  public async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async create(): Promise<void> {
    //console.log(this.contractsForm.value);
    const loading = await this.loadingController.create();
    await loading.present();
    
    let data: Contract = {
      id_contract: this.contractsForm.value.id_contract,
      name: this.contractsForm.value.name,
      lastname: this.contractsForm.value.lastname,
      id_document: this.contractsForm.value.id_document,
      state: this.contractsForm.value.state,
      modality: this.contractsForm.value.modality,
      type: this.contractsForm.value.type,
      expire: this.contractsForm.value.expire
    };

    //console.log(contract);
    const contract = await this._contractServices.create(data);

    await loading.dismiss();

    if (contract) {
      this.router.navigateByUrl('/home/contracts/list', { replaceUrl: true });
    } else {
      this.showAlert('Registro fallido', 'por favor intentalo nuevamente');
    }
  }
}
