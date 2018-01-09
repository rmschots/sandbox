import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DossiersComponent } from './dossiers.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dossiers',
        component: DossiersComponent
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class DossiersRoutingModule {
}
