import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/primeng';
import { NavbarComponent } from './navbar/navbar.component';
import { ModuleWithProviders, NgModule } from '@angular/core';

const PRIMENG_IMPORTS = [
  MenubarModule
];

const MODULES = [
  CommonModule,
  RouterModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  ...PRIMENG_IMPORTS
];

const MODALS = [];

const COMPONENTS = [
  NavbarComponent,
  ...MODALS
];

const SERVICES = [];

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
