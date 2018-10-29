import { NgModule } from '@angular/core';

import { PlaceComponentRoutingModule } from './place-component-routing.module';
import { PlaceComponentComponent } from './place-component.component';
import { SharedModule } from '../shared/shared.module';
import { BrokenGenericPlaceComponent } from './broken/broken-generic-place/broken-generic-place.component';
import { BrokenPlaceInputComponent } from './broken/broken-place-input/broken-place-input.component';
import { BrokenCountryDropdownComponent } from './broken/broken-country-dropdown/broken-country-dropdown.component';
import { BrokenMunicipalityDropdownComponent } from './broken/broken-municipality-dropdown/broken-municipality-dropdown.component';
import { MunicipalityService } from './services/municipality.service';
import { AutoCompleteModule } from 'primeng/primeng';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { MunicipalityPipe } from './pipes/municipality.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { CountryService } from './services/country.service';
import { PlacesService } from './services/places.service';
import { FixedPlaceInputComponent } from './fixed/fixed-place-input/fixed-place-input.component';
import { FixedGenericPlaceComponent } from './fixed/fixed-generic-place/fixed-generic-place.component';

@NgModule({
  imports: [
    SharedModule,
    PlaceComponentRoutingModule,
    AutoCompleteModule
  ],
  declarations: [
    PlaceComponentComponent,
    BrokenGenericPlaceComponent,
    BrokenPlaceInputComponent,
    BrokenCountryDropdownComponent,
    BrokenMunicipalityDropdownComponent,
    ValidationMessagesComponent,
    MunicipalityPipe,
    CountryPipe,
    FixedPlaceInputComponent,
    FixedGenericPlaceComponent
  ],
  providers: [MunicipalityService, CountryService, PlacesService]
})
export class PlaceComponentModule {
}
