import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CentreService } from '../centre.service';

@Component({
  selector: 'app-add-recycle-center',
  templateUrl: './add-recycle-center.component.html',
  styleUrls: ['./add-recycle-center.component.scss']
})
export class AddRecycleCenterComponent {
  centerForm = new FormGroup({
    Name: new FormControl(''),
    Adresa: new FormControl(''),
    Email: new FormControl(''),
    materials: new FormControl('')
  });

  constructor(private centreService: CentreService) {
  }

  submitForm(){
    return this.centreService.postNewRecycleCenter(this.centerForm.value).subscribe()
  }
}
