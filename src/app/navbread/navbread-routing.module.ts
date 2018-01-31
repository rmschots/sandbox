import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbreadComponent } from './navbread.component';
import { IdbreadComponent } from './idbread/idbread.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'navbread/:id',
        component: NavbreadComponent,
        children: [
          {
            path: 'subpage1',
            component: IdbreadComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class NavbreadRoutingModule {
}
