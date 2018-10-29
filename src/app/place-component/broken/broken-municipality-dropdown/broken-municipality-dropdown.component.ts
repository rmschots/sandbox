import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { Unsubscribable } from '../../../shared/util/Unsubscribable';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CompleteMethodEvent } from '../../models/complete-method-event.model';
import { MunicipalityResponse } from '../../models/municipality-response.model';
import { DropdownMode } from '../../models/dropdown-mode.enum';
import { sortByKey } from '../../utils/sort-by-key';
import { MunicipalityService } from '../../services/municipality.service';

@Component({
  selector: 'sb-broken-municipality-dropdown',
  templateUrl: './broken-municipality-dropdown.component.html',
  styleUrls: ['./broken-municipality-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrokenMunicipalityDropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrokenMunicipalityDropdownComponent extends Unsubscribable implements OnInit, ControlValueAccessor {

  @Input()
  placeholder: string;

  control: FormControl = new FormControl(null);
  options: MunicipalityResponse[];
  dropdownMode: typeof DropdownMode = DropdownMode;

  private _value: Subject<Value> = new Subject();
  private value$: Observable<Value> = this._value.asObservable();

  propagateChange: Function = () => undefined;

  constructor(
    private municipalityService: MunicipalityService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((value: MunicipalityResponse) => {
      this.change(value);
      this.changeDetectorRef.markForCheck();
    });

    this.value$.pipe(
      takeUntil(this.ngUnsubscribe$),
      debounceTime(100),
      switchMap(
        value => this.municipalityService.loadAll(value.query).pipe(
          map(municipalities => {
            return {
              value,
              municipalities
            };
          })
        )
      ),
      tap(response => {
        // set value if allow and match
        if (response.value.setValue && response.municipalities.length === 1) {
          const municipality = response.municipalities[0];

          if (response.value.query === municipality.nisCode) {
            this.control.setValue(municipality, {
              emitEvent: false
            });

            this.changeDetectorRef.markForCheck();
          }
        }
      }),
      map(response => sortByKey(response.municipalities, 'translation'))
    ).subscribe(response => {
      this.options = response;
      this.changeDetectorRef.markForCheck();
    });
  }

  search(event: CompleteMethodEvent) {
    this._value.next({
      query: event.query,
      setValue: false
    });
  }

  clear(event: Event) {
    this.change(null);
    this.changeDetectorRef.markForCheck();
  }

  get value(): MunicipalityResponse {
    return this.control.value;
  }

  writeValue(value: string) {
    this._value.next({
      query: value,
      setValue: true
    });
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

  private change(value?: MunicipalityResponse) {
    this.propagateChange(value ? value.nisCode : null);
  }

}

interface Value {
  query: string;
  setValue: boolean;
}
