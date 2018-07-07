import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroDemoComponent } from './intro-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: IntroDemoComponent,
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule]
})
export class IntroDemoRoutingModule {
}
