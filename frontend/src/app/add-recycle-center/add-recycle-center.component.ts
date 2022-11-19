import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-recycle-center',
  templateUrl: './add-recycle-center.component.html',
  styleUrls: ['./add-recycle-center.component.scss']
})
export class AddRecycleCenterComponent {
  centerForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  });
}
