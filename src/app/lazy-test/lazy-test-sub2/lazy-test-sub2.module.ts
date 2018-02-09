import { NgModule } from '@angular/core';
import { LazyTestSub2Component } from './lazy-test-sub2.component';
import { LazyTestSub2RoutingModule } from './lazy-test-sub2-routing.module';
import { LazyTestSharedModule } from '../shared/lazy-test-shared.module';
import { NonLazyTestService } from '../shared/services/non-lazy-test.service';

@NgModule({
  imports: [
    LazyTestSharedModule,
    LazyTestSub2RoutingModule
  ],
  declarations: [LazyTestSub2Component],
  providers: [NonLazyTestService]
})
export class LazyTestSub2Module {
}
