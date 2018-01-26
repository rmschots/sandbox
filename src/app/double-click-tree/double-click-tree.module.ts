import { NgModule } from '@angular/core';
import { DoubleClickTreeComponent } from './double-click-tree.component';
import { DoubleClickTreeRoutingModule } from './double-click-tree-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/primeng';

@NgModule({
  imports: [
    SharedModule,
    DoubleClickTreeRoutingModule,
    TreeModule
  ],
  declarations: [DoubleClickTreeComponent]
})
export class DoubleClickTreeModule {
}
