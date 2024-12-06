import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmintabsPageRoutingModule } from './admintabs-routing.module';

import { AdmintabsPage } from './admintabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmintabsPageRoutingModule
  ],
  declarations: [AdmintabsPage]
})
export class AdmintabsPageModule {}
