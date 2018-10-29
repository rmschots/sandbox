import { EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { isFunction } from 'rxjs/util/isFunction';
import { Unsubscribable } from '../../../shared/util/Unsubscribable';

export class GenericFormElement extends Unsubscribable {
  @Input()
  message: string;

  @Input()
  field: FormControl;

  @Input()
  readonly = false;

  @Input()
  uiSize = 10;

  @Input()
  uiLabel = 2;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  get required() {
    return this.hasRequiredField(this.field);
  }

  private hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator && isFunction(abstractControl.validator)) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }

    return false;
  };
}
