import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminoPage } from './admino.page';

const routes: Routes = [
  {
    path: '',
    component: AdminoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminoPageRoutingModule {}
