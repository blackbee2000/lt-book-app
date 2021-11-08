import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBillPage } from './detail-bill.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBillPageRoutingModule {}
