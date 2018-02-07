import { NgModule } from '@angular/core';
import { LazyTestComponent } from './lazy-test.component';
import { SharedModule } from '../shared/shared.module';
import { LazyTestRoutingModule } from './lazy-test-routing.module';
import { LazyTestSharedModule } from './shared/lazy-test-shared.module';

@NgModule({
  imports: [
    // SharedModule,
    LazyTestRoutingModule,
    LazyTestSharedModule.forRoot()
  ],
  declarations: [LazyTestComponent]
})
export class LazyTestModule {
}
