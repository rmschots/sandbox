import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { Unsubscribable } from '../../../shared/util/Unsubscribable';
import { BELGIUM_NIS_CODE } from '../../models/municipality-response.model';
import { takeUntil } from 'rxjs/operators';
import { Country } from '../../models/country.model';
import { Place } from '../../models/place.model';
import { Municipality } from '../../models/municipality.model';

@Component({
  selector: 'sb-broken-place-input',
  templateUrl: './broken-place-input.component.html',
  styleUrls: ['./broken-place-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrokenPlaceInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BrokenPlaceInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrokenPlaceInputComponent extends Unsubscribable implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  @Input()
  readonly = false;

  @Input()
  placeholderCountry: string;

  @Input()
  placeholderMunicipality: string;

  belgium: string = BELGIUM_NIS_CODE;
  place: FormGroup = new FormGroup({
    country: new FormControl({
      nisCode: null
    }, Validators.required),
    municipality: new FormGroup({
      nisCode: new FormControl(null, Validators.required),
      name: new FormControl(null)
    }),
    oi: new FormControl(new Date().getTime())
  });

  propagateChange: Function = () => undefined;

  constructor() {
    super();
  }

  ngOnInit() {
    this.place.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((place: Place) => this.propagateChange(place));

    this.countryControl.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((country: Country) => {
      this.municipalityGroup.setValue({
        nisCode: null,
        name: null
      }, {
        emitEvent: false
      });

      if (country) {
        this.setMunicipalityNisCodeRequired(country);
        this.municipalityGroup.enable({
          emitEvent: false
        });
      } else {
        this.setMunicipalityNisCodeRequired(null);
        this.municipalityGroup.disable({
          emitEvent: false
        });
      }
    });
  }

  get countryControl(): FormControl {
    return this.place.get('country') as FormControl;
  }

  get countryValue(): Country {
    return this.countryControl.value as Country;
  }

  get municipalityValue(): Municipality {
    return this.municipalityGroup.value as Municipality;
  }

  get municipalityGroup(): FormGroup {
    return this.place.get('municipality') as FormGroup;
  }

  get municipalityNisCodeControl(): FormControl {
    return this.municipalityGroup.get('nisCode') as FormControl;
  }

  get municipalityNameControl(): FormControl {
    return this.municipalityGroup.get('name') as FormControl;
  }

  get value(): Place {
    return this.place.value;
  }

  set value(value: Place | null) {
    // Default to belgium
    let country: Country = {
      nisCode: this.belgium
    };

    if (value && value.country && (value.country.nisCode || value.country.name)) {
      country = value.country;
    }

    this.place.patchValue({
      country: country,
      municipality: {
        nisCode: value && value.municipality ? value.municipality.nisCode : null,
        name: value && value.municipality ? value.municipality.name : null
      }
    }, {
      emitEvent: false
    });

    this.setMunicipalityNisCodeRequired(country);

    // Always enable as belgium is default
    this.municipalityGroup.enable({
      emitEvent: false
    });
  }

  writeValue(place: Place | null) {
    this.value = place;
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function) {
    // empty
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.place.disable({
      emitEvent: false
    }) : this.place.enable({
      emitEvent: false
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('validate', this.place.get('oi').value);
    if (this.place.invalid) {
      let errors: ValidationErrors = {};

      if (this.countryControl.errors) {
        errors = {
          ...errors,
          country: {
            ...this.countryControl.errors
          }
        };
      }

      if (this.municipalityNisCodeControl.errors) {
        errors = {
          ...errors,
          municipality: {
            ...this.municipalityNisCodeControl.errors
          }
        };
      }

      return errors;
    }

    return null;
  }

  private setMunicipalityNisCodeRequired(country?: Country) {
    if (country) {
      if (country.nisCode === this.belgium) {
        this.municipalityNisCodeControl.setValidators(Validators.required);
      } else {
        this.municipalityNisCodeControl.clearValidators();
      }
    } else {
      this.municipalityNisCodeControl.clearValidators();
    }
  }
}
