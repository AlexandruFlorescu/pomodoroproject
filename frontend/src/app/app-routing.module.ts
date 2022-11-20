import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddRecycleCenterComponent } from './add-recycle-center/add-recycle-center.component';
import { CentersComponent } from './centers/centers.component';
import { FiltrareCentreComponent } from './filtrare-centre/filtrare-centre.component';

const routes: Routes = [
  { path: 'filters', component: FiltrareCentreComponent },
  { path: 'centers', component: CentersComponent },
  { path: 'add-center', component: AddRecycleCenterComponent},
  { path: 'activities', component: ActivitiesComponent },
  { path: 'add-activity', component: AddActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
