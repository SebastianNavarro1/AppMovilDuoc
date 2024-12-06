import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminoPageRoutingModule } from './admino-routing.module';

import { AdminoPage } from './admino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminoPageRoutingModule
  ],
  declarations: [AdminoPage]
})
export class AdminoPageModule {}
