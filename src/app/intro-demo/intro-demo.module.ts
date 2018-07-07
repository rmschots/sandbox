import { NgModule } from '@angular/core';

import { IntroDemoRoutingModule } from './intro-demo-routing.module';
import { IntroDemoComponent } from './intro-demo.component';
import { IntroDemoSharedModule } from './shared/intro-demo-shared.module';
import { IntroModule } from './intro/intro.module';

@NgModule({
  imports: [
    IntroDemoSharedModule,
    IntroDemoRoutingModule,
    IntroModule.forRoot()
  ],
  declarations: [IntroDemoComponent]
})
export class IntroDemoModule {
}
