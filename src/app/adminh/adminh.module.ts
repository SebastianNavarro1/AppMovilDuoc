import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminhPageRoutingModule } from './adminh-routing.module';

import { AdminhPage } from './adminh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminhPageRoutingModule
  ],
  declarations: [AdminhPage]
})
export class AdminhPageModule {}
