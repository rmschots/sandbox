import { IntroPlaybookOptions } from './intro-playbook-options';
import { ComponentType } from '@angular/cdk/portal/typings/portal';
import { TemplateRef } from '@angular/core';

export interface IntroPlaybook {
  entries: IntroPlaybookEntry<any>[];
  activeEntry?: IntroPlaybookEntry<any>;
  options?: IntroPlaybookOptions;
}

export interface IntroPlaybookEntry<T> {
  id: string;
  displayTime?: number;
  component?: ComponentType<T>;
  templateRef?: TemplateRef<T>;
  data: any;
}
