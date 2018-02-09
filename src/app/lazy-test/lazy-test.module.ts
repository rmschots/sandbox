import { NgModule } from '@angular/core';
import { LazyTestComponent } from './lazy-test.component';
import { LazyTestRoutingModule } from './lazy-test-routing.module';
import { LazyTestSharedModule } from './shared/lazy-test-shared.module';
import { NonLazyTestService } from './shared/services/non-lazy-test.service';

@NgModule({
  imports: [
    LazyTestRoutingModule,
    LazyTestSharedModule.forRoot()
  ],
  declarations: [LazyTestComponent],
  providers: [NonLazyTestService]
})
export class LazyTestModule {
}
