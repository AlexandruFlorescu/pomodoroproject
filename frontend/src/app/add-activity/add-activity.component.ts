import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {
  centerForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    materials: new FormControl('')
  });
}
