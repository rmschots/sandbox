import { NgModule } from '@angular/core';
import { LazyTestSub1Component } from './lazy-test-sub1.component';
import { LazyTestSharedModule } from '../shared/lazy-test-shared.module';
import { LazyTestSub1RoutingModule } from './lazy-test-sub1-routing.module';
import { NonLazyTestService } from '../shared/services/non-lazy-test.service';

@NgModule({
  imports: [
    LazyTestSharedModule,
    LazyTestSub1RoutingModule
  ],
  declarations: [LazyTestSub1Component],
  providers: [NonLazyTestService]
})
export class LazyTestSub1Module {
}
