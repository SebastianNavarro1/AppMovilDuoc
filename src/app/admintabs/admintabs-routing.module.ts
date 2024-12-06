import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmintabsPage } from './admintabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdmintabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmintabsPageRoutingModule {}
