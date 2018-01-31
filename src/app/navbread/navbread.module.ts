import { NgModule } from '@angular/core';
import { NavbreadComponent } from './navbread.component';
import { IdbreadComponent } from './idbread/idbread.component';
import { SharedModule } from '../shared/shared.module';
import { NavbreadRoutingModule } from './navbread-routing.module';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  imports: [
    SharedModule,
    NavbreadRoutingModule,
    AngularSplitModule
  ],
  declarations: [NavbreadComponent, IdbreadComponent]
})
export class NavbreadModule {
}
