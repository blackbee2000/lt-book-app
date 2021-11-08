import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaymentPage } from './payment.page';
import { NgRatingBarModule } from 'ng-rating-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    ComponentsModule,
    NgRatingBarModule
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
