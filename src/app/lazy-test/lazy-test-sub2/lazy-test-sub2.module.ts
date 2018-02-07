import { NgModule } from '@angular/core';
import { LazyTestSub2Component } from './lazy-test-sub2.component';
import { LazyTestSub2RoutingModule } from './lazy-test-sub2-routing.module';
import { LazyTestSharedModule } from '../shared/lazy-test-shared.module';

@NgModule({
  imports: [
    LazyTestSharedModule,
    LazyTestSub2RoutingModule
  ],
  declarations: [LazyTestSub2Component]
})
export class LazyTestSub2Module {
}
