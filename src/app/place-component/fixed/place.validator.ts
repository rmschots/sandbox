import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Place } from '../models/place.model';

export function place(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.value || !control.value.country || !control.value.country.nisCode) {
      return {required: 'required'};
    }
    const place = control.value as Place;
    // TODO: implement place validation
    if (!place.municipality || !place.municipality.nisCode) {
      return {'invalid-place': 'invalid-place'};
    }

    return null;
  };
}
