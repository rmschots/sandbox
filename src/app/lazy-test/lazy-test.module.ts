import { NgModule } from '@angular/core';
import { LazyTestComponent } from './lazy-test.component';
import { LazyTestRoutingModule } from './lazy-test-routing.module';
import { LazyTestSharedModule } from './shared/lazy-test-shared.module';

@NgModule({
  imports: [
    LazyTestRoutingModule,
    LazyTestSharedModule.forRoot()
  ],
  declarations: [LazyTestComponent]
})
export class LazyTestModule {
}
