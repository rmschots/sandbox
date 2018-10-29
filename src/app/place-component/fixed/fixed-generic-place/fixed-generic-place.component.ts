import { Component, Input, OnInit } from '@angular/core';
import { GenericFormElement } from '../../broken/broken-generic-place/generic-form-element.component';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sb-fixed-generic-place',
  templateUrl: './fixed-generic-place.component.html',
  styleUrls: ['./fixed-generic-place.component.scss']
})
export class FixedGenericPlaceComponent extends GenericFormElement implements OnInit {

  @Input()
  placeholderCountry: string;

  @Input()
  placeholderMunicipality: string;

  placeFormControl: FormControl;

  ngOnInit(): void {
    this.placeFormControl = new FormControl(this.field.value);
    this.placeFormControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        console.log('errors internal control', this.placeFormControl.errors);
        this.field.setValue(value);
        this.field.updateValueAndValidity();
      });
  }

}
