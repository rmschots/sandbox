import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyTestSub2Component } from './lazy-test-sub2.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LazyTestSub2Component
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class LazyTestSub2RoutingModule {
}
