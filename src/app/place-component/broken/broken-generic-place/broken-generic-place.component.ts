import { Component, Input } from '@angular/core';
import { GenericFormElement } from './generic-form-element.component';

@Component({
  selector: 'sb-broken-generic-place',
  templateUrl: './broken-generic-place.component.html',
  styleUrls: ['./broken-generic-place.component.scss']
})
export class BrokenGenericPlaceComponent extends GenericFormElement {

  @Input()
  placeholderCountry: string;

  @Input()
  placeholderMunicipality: string;

}
