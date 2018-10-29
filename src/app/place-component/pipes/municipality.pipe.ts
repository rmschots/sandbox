import { Pipe, PipeTransform } from '@angular/core';
import { Municipality } from '../models/municipality.model';
import { MunicipalityResponse } from '../models/municipality-response.model';
import { Observable } from 'rxjs/Observable';
import { PlacesService } from '../services/places.service';

@Pipe({
  name: 'municipality'
})
export class MunicipalityPipe implements PipeTransform {

  constructor(private placesService: PlacesService) {
  }

  transform(value: Municipality | MunicipalityResponse): Observable<string> {
    let municipality: Municipality;
    if (value && Object.keys(value).includes('translation')) {
      municipality = MunicipalityResponse.toMunicipalityComponent(value as MunicipalityResponse);
    } else {
      municipality = value as Municipality;
    }
    if (municipality) {
      return this.placesService.getMunicipalityName(municipality);
    } else {
      return Observable.create(observer => {
        observer.next('');
        observer.complete();
      });
    }
  }

}
