import { Injectable } from '@angular/core';
import { Unsubscribable } from '../../shared/util/Unsubscribable';
import { CountryService } from './country.service';
import { MunicipalityService } from './municipality.service';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil } from 'rxjs/operators';
import { CountryResponse } from '../models/country-response.model';
import { Municipality } from '../models/municipality.model';
import { MunicipalityResponse } from '../models/municipality-response.model';
import { Place } from '../models/place.model';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable()
export class PlacesService extends Unsubscribable {
  private countries: { string?: string } = {};
  private municipalities: { string?: string } = {};

  constructor(private countryService: CountryService, private municipalityService: MunicipalityService) {
    super();
  }

  getCountryName(country: Country): Observable<string> {
    if (country.nisCode) {
      if (this.countries[country.nisCode]) {
        return Observable.create(observer => {
          observer.next(this.countries[country.nisCode]);
          observer.complete();
        });
      } else {
        return this.countryService.loadAll(country.nisCode)
          .pipe(takeUntil(this.ngUnsubscribe$), map((response: CountryResponse[]) => {
            if (response.length > 0) {
              this.countries[country.nisCode] = response[0].translation;

              return response[0].translation;
            } else {
              return '';
            }
          }));
      }
    } else {
      return Observable.create(observer => {
        observer.next(country.name ? country.name : '');
        observer.complete();
      });
    }
  }

  getMunicipalityName(municipality: Municipality): Observable<string> {

    if (municipality.nisCode) {
      if (this.municipalities[municipality.nisCode]) {
        return Observable.create(observer => {
          observer.next(this.municipalities[municipality.nisCode]);
          observer.complete();
        });
      } else {
        return this.municipalityService.loadAll(municipality.nisCode)
          .pipe(takeUntil(this.ngUnsubscribe$), map((response: MunicipalityResponse[]) => {
            if (response.length > 0) {
              this.municipalities[municipality.nisCode] = response[0].translation;

              return response[0].translation;
            } else {
              return municipality.name;
            }
          }));
      }
    } else {
      return Observable.create(observer => {
        observer.next(municipality.name ? municipality.name : '');
        observer.complete();
      });
    }
  }

  getPlaceName(place: Place): Observable<string> {
    return forkJoin(
      this.getCountryName(place.country),
      this.getMunicipalityName(place.municipality)
    ).pipe(map((responses: string[]) => {
      if (responses[0] && responses[1]) {
        return responses[0].concat(' - ').concat(responses[1]);
      } else {
        return '';
      }
    }));
  }
}
