import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRoutingModule } from './my-routing.module';
import { TestComponent } from './test/test.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    TestComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MyRoutingModule
  ]
})
export class MyModule { }
