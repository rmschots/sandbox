import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoubleClickTreeComponent } from './double-click-tree.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'double-click-tree',
        component: DoubleClickTreeComponent
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class DoubleClickTreeRoutingModule {
}
