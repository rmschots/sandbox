import { Country } from './country.model';
import { Municipality } from './municipality.model';

export interface Place {
  country: Country;
  municipality: Municipality;
}
