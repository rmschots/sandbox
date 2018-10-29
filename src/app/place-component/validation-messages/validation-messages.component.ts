import { Component, Input } from '@angular/core';
import { Unsubscribable } from '../../shared/util/Unsubscribable';
import { AbstractControl, AbstractControlDirective, ValidationErrors } from '@angular/forms';
import { delay, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'sb-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent extends Unsubscribable {

  private errorMessages: any = {
    personNumber: 'COMMON.VALIDATION.PersonNumber',
    required: 'COMMON.VALIDATION.Required',
    requiredMany: 'COMMON.VALIDATION.RequiredMany',
    minlength: 'COMMON.VALIDATION.MinLength',
    maxlength: 'COMMON.VALIDATION.MaxLength',
    pattern: 'COMMON.VALIDATION.Pattern',
    email: 'COMMON.VALIDATION.Email',
    max: 'COMMON.VALIDATION.Max',
    min: 'COMMON.VALIDATION.Min',
    dateInPast: 'COMMON.VALIDATION.DateInPast',
    yearNotZero: 'COMMON.VALIDATION.YearNotZero',
    searchCertificateValidator: 'COMMON.VALIDATION.Min',
    multipleBirthsSumValidator: 'CERTIFICATE.CERTIFICATE_SPECIFIC.BIRTH.ADDITIONAL_INFORMATION.sumValidation',
    StartDateBeforeEndDate: 'COMMON.VALIDATION.StartDateEndDate',
    BeforeDeadlineSendToPdk:
      'CERTIFICATE.CERTIFICATE_SPECIFIC.NATIONALITY.ADDITIONAL_INFORMATION.APPLICATION.ShipmentFileToPdkDateValidation',
    PositiveNumber: 'COMMON.VALIDATION.PositiveNumber',
    PositiveNumberNoZero: 'COMMON.VALIDATION.PositiveNumberNoZero',
    PositiveNumberBiggerThanOne: 'COMMON.VALIDATION.PositiveNumberBiggerThanOne',
    NumberOfBirthsTooBig: 'CERTIFICATE.CERTIFICATE_SPECIFIC.BIRTH.ADDITIONAL_INFORMATION.NumberOfBirthsTooBig',
    DescriptionNotUnique: 'PAGE_SPECIFIC.DOCUMENTS.DescriptionNotUnique',
    declarationDateMoreThanSixMonths: 'CERTIFICATE.CERTIFICATE_SPECIFIC.MARRIAGE' +
      '.ADDITIONAL_INFORMATION.VALIDATION.DECLARATION_DATE.DateBeforeBySixMonths',
    declarationDateMoreThan15Days: 'CERTIFICATE.CERTIFICATE_SPECIFIC.MARRIAGE' +
      '.ADDITIONAL_INFORMATION.VALIDATION.DECLARATION_DATE.DateBeforeBy15Days',
    declarationDateAfterMarriageDate: 'CERTIFICATE.CERTIFICATE_SPECIFIC.MARRIAGE' +
      '.ADDITIONAL_INFORMATION.VALIDATION.DECLARATION_DATE.AfterMarriageDate',
    cremationRequestDateIsBeforeDeathDate: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.CremationRequestDateIsBeforeDeathDate',
    approvalDateIsBeforeDeathDate: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.ApprovalDateIsBeforeDeathDate',
    approvalDateIsBeforeCremationRequest: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.ApprovalDateIsBeforeCremationRequest',
    cremationDateIsBeforeDeathDate: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.CremationDateIsBeforeDeathDate',
    cremationDateIsBeforeCremationRequest: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.CremationDateIsBeforeCremationRequest',
    intermentDateIsBeforeDeathDate: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.IntermentDateIsBeforeDeathDate',
    intermentTimeIsBeforeArrivalTimeCemetery: 'CERTIFICATE.CERTIFICATE_SPECIFIC.DEATH' +
      '.ADDITIONAL_INFORMATION.VALIDATION.IntermentTimeIsBeforeArrivalTimeCemetery',
    reactionDateIsBeforeDeadline: 'CERTIFICATE.CERTIFICATE_SPECIFIC.RECOGNITION' +
      '.ADDITIONAL_INFORMATION.VALIDATION.ReactionDateIsBeforeDeadline'
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  constructor() {
    super();
  }

  validationErrors(): boolean {
    const showValidation: boolean = this.control && this.control.errors && (this.control.dirty || this.control.touched);

    return showValidation;
  }

  validationError(): string {
    let message = '';
    if (this.control.errors) {
      const errorKey = this.findFirstError(this.control.errors);
      message = this.getMessage(errorKey, this.control.errors[errorKey]);
    }

    return message;
  }

  private findFirstError = (errors: ValidationErrors): string => {
    return this.findErrorsKeys(errors)[0];
  };

  private findErrorsKeys = (errors: ValidationErrors): string[] => {
    let errorKeys: string[] = [];
    let withChildren = false;
    Object.keys(errors).forEach(key => {
      if (Object.keys(errors[key]).length > 0) {
        withChildren = true;
        errorKeys = errorKeys.concat(this.findErrorsKeys(errors[key]));
      }
    });
    if (!withChildren) {
      errorKeys.push(Object.keys(errors)[0]);
    }

    return errorKeys;
  };

  private getMessage(type: string, params: any) {
    let key = this.errorMessages[type];
    let message = '';
    if (!key) {
      key = params.key;
    }
    of(key).pipe(
      delay(500),
      takeUntil(this.ngUnsubscribe$)
    )
      .subscribe(res => message = res);

    return message;
  }

}
