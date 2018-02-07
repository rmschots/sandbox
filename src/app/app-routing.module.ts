import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dossiers',
        pathMatch: 'full'
      }, {
        path: 'lazy-test',
        loadChildren: './lazy-test/lazy-test.module#LazyTestModule'
      }
    ], {useHash: false})
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule {
}
