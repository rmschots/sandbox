export class MunicipalityResponse {
  nisCode?: string;
  translation?: string;

  // TODO
  countryCode?: string;
  municipalityFreeText?: string;
  municipalityLabel?: string;
  municipalityCode?: string;
  countryLabel?: string;
  countryFreeText?: string;

  static toMunicipalityComponent(municipalityRs: MunicipalityResponse): Municipality {
    return municipalityRs ? {
      nisCode: municipalityRs.nisCode,
      name: municipalityRs.translation
    } : undefined;
  }

  static toMunicipalityString(municipalityRs: MunicipalityResponse): string {
    if (municipalityRs) {
      return municipalityRs.municipalityCode;
    } else {
      return undefined;
    }
  }

  static toMunicipalityResponse(municipality: Municipality | string): MunicipalityResponse {
    if (!municipality) {
      return null;
    }
    if (municipality && municipality['nisCode']) {
      return {
        municipalityCode: (municipality as Municipality).nisCode,
        countryCode: BELGIUM_NIS_CODE
      };
    } else {
      return {
        municipalityCode: municipality as string,
        countryCode: BELGIUM_NIS_CODE
      };
    }
  }
}

export interface Municipality {
  nisCode?: string;
  name?: string;
}

export const BELGIUM_NIS_CODE = '150';
