import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaceComponentComponent } from './place-component.component';


@NgModule({
  imports: [RouterModule.forChild([{
      path: '',
      component: PlaceComponentComponent,
      pathMatch: 'full'
    }]
  )],
  exports: [RouterModule]
})
export class PlaceComponentRoutingModule {
}
