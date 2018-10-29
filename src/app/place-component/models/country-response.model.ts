import { Country } from './country.model';

export class CountryResponse {
  nisCode: string;
  translation: string;

  static toCountryComponent(countryRs: CountryResponse | string): Country {
    if (countryRs['nisCode']) {
      return {
        nisCode: (countryRs as CountryResponse).nisCode,
        name: (countryRs as CountryResponse).translation
      };
    } else {
      return {
        nisCode: countryRs as string
      };
    }
  }
}
