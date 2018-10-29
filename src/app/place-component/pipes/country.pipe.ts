import { Pipe, PipeTransform } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Country } from '../models/country.model';
import { CountryResponse } from '../models/country-response.model';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  constructor(private placesService: PlacesService) {
  }

  transform(value: Country | CountryResponse): Observable<string> {
    let country: Country;
    if (value && Object.keys(value).includes('translation')) {
      country = CountryResponse.toCountryComponent(value as CountryResponse);
    } else {
      country = value as Country;
    }
    if (country) {
      return this.placesService.getCountryName(country);
    } else {
      return Observable.create(observer => {
        observer.next('');
        observer.complete();
      });
    }
  }
}

