import { IClientUpdateDto } from './dtos/IClientUpdateDto.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CEPService } from 'src/app/shared/services/cep.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { IClientCreateDto } from './dtos/IClientCreateDto.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

  form = new FormGroup({});
  title = "Operações"
  dataSelected = 'all';
  select = 'all';
  segment = new BehaviorSubject<string>(`${this.dataSelected}`);
  clients = new BehaviorSubject<[]>([]);
  corporationSelected: string;
  typeSaved = { label: "Adicionar", icon: "add" }
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private cepService: CEPService,
    public toast: ToastController) { }

  ngOnInit() {
    this.select = 'all';
    this.segment.subscribe(res => {
      console.log('RES => ', res)
      if (res == "all") {
        this.select = "all"
        this.typeSaved = { label: "Adicionar", icon: "add" }
        this.form.reset()
      }
      this.getAll()
    });
    this.getAll()
    this.forms()
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  validarCEP(event: Event) {
    const target: any = event.target
    if (event && target.value.length == 8) {
      if (!target.value.match("_")) {
        console.log("CPF: ", target.value)
        this.cepService.getCEP(target.value).subscribe((cep: any) => {
          console.log(cep);
          const endereco = {
            street: cep.logradouro,
            district: cep.bairro,
            city: cep.localidade,
            uf: cep.uf,
          };
          this.form.controls['city'].setValue(endereco.city)
          this.form.controls['district'].setValue(endereco.district)
          this.form.controls['street'].setValue(endereco.street)
          this.form.controls['uf'].setValue(endereco.uf)
        });
      }
    }
  }

  alterSearch(ev: any) {
    const value = ev.detail.value.toUpperCase()
    console.log('value => ', value)
    let maior = 0
    if (value && value.length > maior) {
      maior = value.length
      console.log('maior => ', maior, " tamAux=> ", value.length)

      let corps = this.clients.value
      const a: any = corps.filter((a: any) => `${a.name}`.toUpperCase().includes(value))
      console.log("A => ", a)
      this.clients.next(a)
    } else {
      this.getAll()
    }
  }

  segmentChanged(ev: any) {
    const detail = ev.detail;
    this.segment.next(detail.value);
  }

  getAll() {
    this.http.get(`${environment.apiURL}/clients`).subscribe(res => {
      console.log(res)
      this.clients.next(res.reverse())
    })
  }

  save() {
    const data: IClientCreateDto = {
      name: this.form.value.name,
      cpf: this.form.value.cpf,
      birthDate: this.form.value.birthDate,
      addresses: [{
        zipCode: this.form.value.zipCode,
        street: this.form.value.street,
        number: this.form.value.number,
        district: this.form.value.district,
        city: this.form.value.city,
        uf: this.form.value.uf,
        complement: this.form.value.complement
      }]
    }
    this.http.post(`${environment.apiURL}/clients`, data).subscribe(res => {
      console.log(res)
      this.presentToast("Salvo com sucesso!", "success")
      this.form.reset()
    })
  }

  delete(id: number) {
    this.http.delete(`${environment.apiURL}/clients`, id).subscribe(res => {
      this.presentToast("Deletado com sucesso", "success")
      this.getAll()
    })
  }

  toUpdate(client: IClientUpdateDto) {
    console.log("toUpdate()")
    this.typeSaved = { label: "Atualizar", icon: "pencil" }
    this.segment.next("add");
    this.select = "add"

    this.form.controls['id'].setValue(client.id)
    this.form.controls['name'].setValue(client.name)
    this.form.controls['birthDate'].setValue(client.birthDate)
    this.form.controls['cpf'].setValue(client.cpf)

    client.addresses.map((address: any) => {
      this.form.controls['city'].setValue(address.city)
      this.form.controls['district'].setValue(address.district)
      this.form.controls['street'].setValue(address.street)
      this.form.controls['number'].setValue(address.number)
      this.form.controls['uf'].setValue(address.uf)
      this.form.controls['complement'].setValue(address.complement)
      this.form.controls['zipCode'].setValue(address.zipCode)
    })
  }

  update() {
    const client: IClientUpdateDto = {
      id: this.form.value.id,
      name: this.form.value.name,
      cpf: this.form.value.cpf,
      birthDate: this.form.value.birthDate,
      addresses: [{
        zipCode: this.form.value.zipCode,
        street: this.form.value.street,
        number: this.form.value.number,
        district: this.form.value.district,
        city: this.form.value.city,
        uf: this.form.value.uf,
        complement: this.form.value.complement
      }]
    }

    this.http.update(`${environment.apiURL}/clients`, client).subscribe(res => {
      this.presentToast("Atualizado com sucesso", "success")
      this.getAll()
    })
  }

  forms() {
    this.form = this.fb.group({
      id: [""],
      name: ['', Validators.compose([Validators.required])],
      birthDate: ['', Validators.required],
      cpf: ['', Validators.required],
      // Addresses -----------------
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      uf: ['', Validators.required],
      complement: ['', Validators.required]
    })
  }
}
