import { ModuleWithProviders, NgModule } from '@angular/core';
import { IntroStepDirective } from './intro-step/intro-step.directive';
import { SharedModule } from '../../shared/shared.module';
import { IntroService } from './services/intro.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { IntroOverlayComponent } from './overlay/intro-overlay/intro-overlay.component';
import { IntroTextComponent } from './overlay/intro-text/intro-text.component';
import { IntroOverlayService } from './services/intro-overlay.service';
import { IntroEmptyComponent } from './intro-empty/intro-empty.component';

const MODULES = [
  OverlayModule
];

const COMPONENTS = [
  IntroStepDirective
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
    ...PIPES
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
