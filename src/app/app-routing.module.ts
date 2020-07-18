import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { EcomerceComponent } from './pages/ecomerce/ecomerce.component';

const routes: Routes = [

  { path: 'warehouse', component: WarehouseComponent},
  { path: 'ecomerce', component: EcomerceComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'warehouse'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
