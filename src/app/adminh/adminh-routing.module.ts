import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminhPage } from './adminh.page';

const routes: Routes = [
  {
    path: '',
    component: AdminhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminhPageRoutingModule {}
