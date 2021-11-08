import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductDetailPage } from './product-detail.page';
import { NgRatingBarModule } from 'ng-rating-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    ComponentsModule,
    NgRatingBarModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
