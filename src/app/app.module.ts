import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DossiersModule } from './dossiers/dossiers.module';
import { DoubleClickTreeModule } from './double-click-tree/double-click-tree.module';
import { NavbreadModule } from './navbread/navbread.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    DossiersModule,
    DoubleClickTreeModule,
    NavbreadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
