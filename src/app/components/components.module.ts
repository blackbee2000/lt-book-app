import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderSimpleComponent } from './header-simple/header-simple.component';
@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSimpleComponent
  ],
  exports: [
    HeaderComponent,
    HeaderSimpleComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  providers: [FormBuilder],
})
export class ComponentsModule {
}
