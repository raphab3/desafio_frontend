import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CEPService } from 'src/app/shared/services/cep.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { ICreateOrderDto } from './dtos/ICreateOrderDto.interface';
import { IUpdateOrderDto } from './dtos/IUpdateOrderDto.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  form = new FormGroup({});
  dataSelected = 'all';
  select = 'all';
  segment = new BehaviorSubject<string>(`${this.dataSelected}`);
  clients = new BehaviorSubject<[]>([]);
  corporationSelected: string;
  typeSaved = { label: "Adicionar", icon: "add" }
  searchText

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
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
      this.getAllClients()
    });
    this.getAllClients()
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

  segmentChanged(ev: any) {
    const detail = ev.detail;
    this.segment.next(detail.value);
  }

  getAllClients() {
    this.http.get(`${environment.apiURL}/clients?page=${1}&pagesize=${10}`).subscribe((res:any) => {
      console.log(res)
      this.clients.next(res.reverse())
    })
  }

  save() {
    const data: ICreateOrderDto = {
      amount: this.form.value.amount,
      clientId: this.form.value.clientId,
    }
    this.http.post(`${environment.apiURL}/orders`, data).subscribe(res => {
      console.log(res)
      this.presentToast("Salvo com sucesso!", "success")
      this.form.reset()
    })
  }

  delete(id: number) {
    this.http.delete(`${environment.apiURL}/orders`, id).subscribe(res => {
      this.presentToast("Deletado com sucesso", "success")
      this.getAllClients()
    })
  }

  toUpdate(client: IUpdateOrderDto) {
    console.log("toUpdate()")
    this.typeSaved = { label: "Atualizar", icon: "pencil" }
    this.segment.next("add");
    this.select = "add"

    this.form.controls['id'].setValue(client.id)
    this.form.controls['amount'].setValue(client.amount)
  }

  update() {
    const client: IUpdateOrderDto = {
      id: this.form.value.id,
      amount: this.form.value.amount
    }

    this.http.update(`${environment.apiURL}/orders`, client).subscribe(res => {
      this.presentToast("Atualizado com sucesso", "success")
      this.getAllClients()
    })
  }

  forms() {
    this.form = this.fb.group({
      id: [""],
      amount: ['', Validators.compose([Validators.required])],
      clientId: ['', Validators.required],
    })
  }

}
