import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'clients',
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
