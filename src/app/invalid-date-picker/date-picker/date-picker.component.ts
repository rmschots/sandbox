import { Component, forwardRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Unsubscribable } from '../../shared/util/Unsubscribable';
import { Calendar } from 'primeng/primeng';
import * as moment from 'moment';
import { Moment } from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent extends Unsubscribable implements ControlValueAccessor {
  datePickerFormGroup: FormGroup;
  dateTextControl: AbstractControl;
  dateControl: AbstractControl;

  @ViewChild(Calendar) calendar: Calendar;

  _onChange: (value: any) => void = () => undefined;

  _onTouched = () => undefined;

  constructor(private _fb: FormBuilder) {
    super();
    this.datePickerFormGroup = this._fb.group({
      date: [null, Validators.required],
      dateText: [null, Validators.required]
    });
    this.dateControl = this.datePickerFormGroup.get('date');
    this.dateTextControl = this.datePickerFormGroup.get('dateText');
    this.dateControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(date => {
        if (this.dateTextControl.value !== date) {
          this.dateTextControl.setValue(date);
          this._onChange(date);
        }
      });
    this.dateTextControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(date => {
        this._onChange(date);
        const parsedMoment: Moment = moment(date, 'DD/MM/YYYY', true);
        if (parsedMoment.isValid()) {
          if (this.dateControl.value !== date) {
            this.dateControl.setValue(date);
          }
        } else {
          this.calendar.inputFieldValue = date;
        }
      });
  }

  calendarInput(calendarEvent: any) {
    this._onChange(calendarEvent.target.value);
    this.dateTextControl.setValue(calendarEvent.target.value);
  }

  writeValue(obj: any): void {
    // Do nothing
  }

  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    // Do nothing
  }

}
