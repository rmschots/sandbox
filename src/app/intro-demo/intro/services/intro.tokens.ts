import { InjectionToken } from '@angular/core';
import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';

export const INTRO_TEXT_DATA = new InjectionToken<any>('INTRO_TEXT_DATA');
export const INTRO_DIRECTION_LISTENER = new InjectionToken<FlexibleConnectedPositionStrategy>('INTRO_DIRECTION_LISTENER');
