import { Component } from '@angular/core';
import { CentreService } from '../centre.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  displayedColumns = ['description', 'location', 'date'];
  dataSource : any;

  constructor(private activities: CentreService) {
    this.activities.getAllActivies().subscribe(resp => {
      this.dataSource = resp
    }
    )
  }


}
