import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MunicipalityResponse } from '../models/municipality-response.model';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Injectable()
export class MunicipalityService {

  loadAll(query?: string): Observable<MunicipalityResponse[]> {
    return of([{
      nisCode: '12007',
      translation: 'Bornem',

      // TODO
      countryCode: '150',
      municipalityFreeText: null,
      municipalityLabel: 'Bornem',
      municipalityCode: '12007',
      countryLabel: 'Belgium',
      countryFreeText: null
    }] as MunicipalityResponse[])
      .pipe(delay(1000));
  }
}
