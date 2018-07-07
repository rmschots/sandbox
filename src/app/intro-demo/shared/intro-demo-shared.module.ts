import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IntroModule } from '../intro/intro.module';

const MODULES = [
  SharedModule,
  IntroModule
];

const COMPONENTS = [];

const PIPES = [];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class IntroDemoSharedModule {
}
