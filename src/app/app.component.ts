import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/dashboard', icon: 'home' },
    { title: 'Clientes', url: '/clients', icon: 'people' },
    { title: 'Pedidos', url: '/orders', icon: 'cube' },
  ];
  public labels = ['Home', 'Clientes', 'Pedidos'];
  constructor() {}
}
