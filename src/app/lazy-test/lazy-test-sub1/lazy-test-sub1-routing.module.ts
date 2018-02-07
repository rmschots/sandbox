import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyTestSub1Component } from './lazy-test-sub1.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LazyTestSub1Component
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class LazyTestSub1RoutingModule {
}
