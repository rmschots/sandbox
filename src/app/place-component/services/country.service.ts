import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CountryResponse } from '../models/country-response.model';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  loadAll(query?: string): Observable<CountryResponse[]> {
    return of([{
      nisCode: '150',
      translation: 'Belgium'
    }] as CountryResponse[])
      .pipe(delay(1000));
  }
}
