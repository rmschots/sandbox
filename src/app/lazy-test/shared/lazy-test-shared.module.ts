import { ModuleWithProviders, NgModule } from '@angular/core';
import { LazyTest2Service } from './services/lazy-test2.service';
import { SharedModule } from '../../shared/shared.module';
import { ExtraService } from './services/extra.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  declarations: [],
  providers: [ExtraService]
})
export class LazyTestSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LazyTestSharedModule,
      providers: [LazyTest2Service]
    };
  }
}
