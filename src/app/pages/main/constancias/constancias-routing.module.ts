import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstanciasPage } from './constancias.page';

const routes: Routes = [
  {
    path: '',
    component: ConstanciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstanciasPageRoutingModule {}
