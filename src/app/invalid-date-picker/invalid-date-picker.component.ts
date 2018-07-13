import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-invalid-date-picker',
  templateUrl: './invalid-date-picker.component.html',
  styleUrls: ['./invalid-date-picker.component.scss']
})
export class InvalidDatePickerComponent {
  invalidDatePickerFormGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.invalidDatePickerFormGroup = this._fb.group({
      date: [null, [Validators.required, Validators.pattern('^\\d{1,2}\\/\\d{1,2}\\/\\d{1,4}$')]]
    });
  }
}
