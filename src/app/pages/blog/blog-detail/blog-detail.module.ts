import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogDetailPageRoutingModule } from './blog-detail-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { BlogDetailPage } from './blog-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BlogDetailPage]
})
export class BlogDetailPageModule {}
