import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/primeng';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LazyTestService } from './services/lazy-test.service';
import { MomentModule } from 'ngx-moment';

const PRIMENG_IMPORTS = [
  MenubarModule
];

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MomentModule,
  ...PRIMENG_IMPORTS
];

const MODALS = [];

const COMPONENTS = [
  NavbarComponent,
  ...MODALS
];

const SERVICES = [
  LazyTestService
];

const PIPES = [];

const GUARDS = [];

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
  ],
  entryComponents: [
    MODALS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES, ...GUARDS]
    };
  }
}
