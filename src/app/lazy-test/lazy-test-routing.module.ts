import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyTestComponent } from './lazy-test.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LazyTestComponent,
        children: [
          {
            path: 'lazy-test-sub1',
            loadChildren: './lazy-test-sub1/lazy-test-sub1.module#LazyTestSub1Module'
          }, {
            path: 'lazy-test-sub2',
            loadChildren: './lazy-test-sub2/lazy-test-sub2.module#LazyTestSub2Module'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class LazyTestRoutingModule {
}
