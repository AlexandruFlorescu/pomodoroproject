import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CentreService } from '../centre.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {
  centerForm = new FormGroup({
    date: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
  });

  
  constructor(private centreService: CentreService) {
  }

  submitForm(){
    return this.centreService.postNewActivity(this.centerForm.value).subscribe()
  }
}
