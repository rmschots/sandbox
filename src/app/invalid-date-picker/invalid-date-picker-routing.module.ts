import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidDatePickerComponent } from './invalid-date-picker.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InvalidDatePickerComponent,
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class InvalidDatePickerRoutingModule {
}
