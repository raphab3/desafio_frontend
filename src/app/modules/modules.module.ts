import { HomeComponent } from './home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'clients',
    component: ClientComponent,
  }
];

@NgModule({
  declarations: [ClientComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ModulesModule { }
