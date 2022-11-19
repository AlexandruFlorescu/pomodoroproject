import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecycleCenterComponent } from './add-recycle-center/add-recycle-center.component';
import { CentersComponent } from './centers/centers.component';
import { FiltrareCentreComponent } from './filtrare-centre/filtrare-centre.component';

const routes: Routes = [
  { path: 'accordion', component: FiltrareCentreComponent },
  { path: 'centers', component: CentersComponent },
  { path: 'add-center', component: AddRecycleCenterComponent}
  // { path: 'accordion', component: FiltrareCentreComponent },
  // { path: 'accordion', component: FiltrareCentreComponent },
  // { path: 'accordion', component: FiltrareCentreComponent },
  // { path: 'accordion', component: FiltrareCentreComponent },
  // { path: 'accordion', component: FiltrareCentreComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
