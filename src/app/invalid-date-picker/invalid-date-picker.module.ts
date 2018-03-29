import { NgModule } from '@angular/core';
import { InvalidDatePickerRoutingModule } from './invalid-date-picker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'primeng/primeng';
import { InvalidDatePickerComponent } from './invalid-date-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  imports: [
    SharedModule,
    InvalidDatePickerRoutingModule,
    CalendarModule
  ],
  declarations: [
    InvalidDatePickerComponent,
    DatePickerComponent
  ]
})
export class InvalidDatePickerModule {
}
