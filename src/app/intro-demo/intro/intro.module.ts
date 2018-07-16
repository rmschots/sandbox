import { ModuleWithProviders, NgModule } from '@angular/core';
import { IntroStepDirective } from './intro-step/intro-step.directive';
import { SharedModule } from '../../shared/shared.module';
import { IntroService } from './services/intro.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { IntroOverlayComponent } from './overlay/intro-overlay/intro-overlay.component';
import { IntroTextComponent } from './overlay/intro-text/intro-text.component';
import { IntroOverlayService } from './services/intro-overlay.service';
import { IntroEmptyComponent } from './overlay/intro-empty/intro-empty.component';
import { CommonModule } from '@angular/common';
import { IntroNextButtonDirective } from './intro-next-button/intro-next-button.directive';
import { IntroCancelButtonDirective } from './intro-cancel-button/intro-cancel-button.directive';
import { IntroPreviousButtonDirective } from './intro-previous-button/intro-previous-button.directive';

const MODULES = [
  OverlayModule,
  CommonModule
];

const COMPONENTS = [
  IntroStepDirective,
  IntroNextButtonDirective,
  IntroCancelButtonDirective,
  IntroPreviousButtonDirective
];

const SERVICES = [
  IntroService,
  IntroOverlayService
];

const PIPES = [];

const GUARDS = [];

const ENTRY_COMPONENTS = [
  IntroOverlayComponent,
  IntroTextComponent,
  IntroEmptyComponent
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...ENTRY_COMPONENTS
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...ENTRY_COMPONENTS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class IntroModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES, ...GUARDS]
    };
  }
}
