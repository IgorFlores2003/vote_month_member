import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificarPageRoutingModule } from './identificar-routing.module';

import { IdentificarPage } from './identificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentificarPageRoutingModule
  ],
  declarations: [IdentificarPage]
})
export class IdentificarPageModule {}
