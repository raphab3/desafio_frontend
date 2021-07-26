import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: "",
    component: ClientComponent
  }
]

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientModule { }
