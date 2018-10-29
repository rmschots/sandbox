import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Unsubscribable } from '../../../shared/util/Unsubscribable';
import { DropdownMode } from '../../models/dropdown-mode.enum';
import { AutoComplete } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { sortByKey } from '../../utils/sort-by-key';
import { CompleteMethodEvent } from '../../models/complete-method-event.model';
import { CountryResponse } from '../../models/country-response.model';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'sb-broken-country-dropdown',
  templateUrl: './broken-country-dropdown.component.html',
  styleUrls: ['./broken-country-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrokenCountryDropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrokenCountryDropdownComponent extends Unsubscribable implements OnInit, ControlValueAccessor {

  @Input()
  placeholder: string;

  @Input()
  forceSelection = false;

  control: FormControl = new FormControl(null);
  options: CountryResponse[];
  dropdownMode: typeof DropdownMode = DropdownMode;

  @ViewChild(AutoComplete) autoComplete: AutoComplete;

  private _value: Subject<Value> = new Subject();
  private value$: Observable<Value> = this._value.asObservable();

  propagateChange: Function = () => undefined;

  constructor(private countryService: CountryService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((value: CountryResponse | string | null) => this.change(value));

    this.value$.pipe(
      takeUntil(this.ngUnsubscribe$),
      // set value if no lookup is needed, autocomplete needs an object when setting value
      tap(value => {
        if (!value.lookup) {
          this.value = {
            nisCode: null,
            translation: value.query
          } as CountryResponse;
        }
      }),
      filter(value => value.lookup),
      switchMap(
        value => this.countryService.loadAll(value.query),
        (value, countries) => ({
          value,
          countries
        })
      ),
      tap(response => {
        // set the country if the value is a niscode
        if (response.value.isNisCode && response.countries.length === 1) {
          const country = response.countries[0];
          this.value = country;
        }
      }),
      map(response => sortByKey(response.countries, 'translation'))
    ).subscribe(response => {
      this.options = response;
      this.changeDetectorRef.markForCheck();
    });
  }

  handleDropdownClick(event: { originalEvent: Event, query: string }) {
    if (this.autoComplete.panelVisible) {
      event.originalEvent.preventDefault();
      event.originalEvent.stopPropagation();
      this.autoComplete.inputEL.nativeElement.blur();
      this.autoComplete.panelVisible = false;
    }
  }

  search(event: CompleteMethodEvent) {
    this._value.next({
      query: event.query,
      isNisCode: false,
      lookup: true
    });
  }

  clear(event: Event) {
    this.control.setValue(null, {
      emitEvent: false
    });
  }

  get value(): CountryResponse | string | null {
    return this.control.value;
  }

  set value(value: CountryResponse | string | null) {
    this.control.setValue(value, {
      emitEvent: false
    });
    this.changeDetectorRef.markForCheck();
  }

  writeValue(country: Country | string | number | null) {
    let query: string = null;

    if (country && (country instanceof Object)) {
      query = (country as Country).nisCode ? (country as Country).nisCode : (country as Country).name;
      this._value.next({
        query: query,
        isNisCode: Boolean(query && (country as Country).nisCode),
        lookup: Boolean(query && (country as Country).nisCode)
      });
    }
    if (country && (typeof country === 'number')) {
      query = country.toString();
      this._value.next({
        query: query,
        isNisCode: Boolean(query),
        lookup: Boolean(query)
      });
    }
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function) {
    // empty
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.control.disable({
      emitEvent: false
    }) : this.control.enable({
      emitEvent: false
    });
  }

  private change(value: CountryResponse | string | null) {
    const country: Country = mapToCountry(value);
    this.propagateChange(country);
  }

}

function mapToCountry(value: CountryResponse | string | null): Country {
  if (value) {
    return {
      nisCode: isCountryResponse(value) ? value.nisCode : null,
      name: isCountryResponse(value) ? (value.nisCode ? null : value.translation) : value
    };
  }

  return null;
}

function isCountryResponse(value: CountryResponse | string): value is CountryResponse {
  return (value as CountryResponse).nisCode !== undefined;
}

interface Value {
  query: string;
  isNisCode: boolean;
  lookup: boolean;
}
