import { NgModule } from '@angular/core';
import { DossiersComponent } from './dossiers.component';
import { SharedModule } from '../shared/shared.module';
import { DossiersRoutingModule } from './dossiers-routing.module';
import { AngularSplitModule } from 'angular-split';
import { DossierNavigationComponent } from './dossier-navigation/dossier-navigation.component';
import { DossierMapComponent } from './dossier-map/dossier-map.component';
import { DossierListComponent } from './dossier-list/dossier-list.component';
import { TreeModule } from 'primeng/primeng';


@NgModule({
  imports: [
    SharedModule,
    DossiersRoutingModule,
    AngularSplitModule,
    TreeModule
  ],
  declarations: [DossiersComponent, DossierNavigationComponent, DossierMapComponent, DossierListComponent]
})
export class DossiersModule {
}
