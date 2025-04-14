import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificarPage } from './identificar.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificarPageRoutingModule {}
