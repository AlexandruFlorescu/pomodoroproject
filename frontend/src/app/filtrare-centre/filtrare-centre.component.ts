import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CentreService } from '../centre.service';

@Component({
  selector: 'app-filtrare-centre',
  templateUrl: './filtrare-centre.component.html',
  styleUrls: ['./filtrare-centre.component.scss']
})

export class FiltrareCentreComponent {

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  panelOpenState: boolean = false;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  });
  estimatesForm = new FormGroup({
    plastic: new FormControl(''),
    menajer: new FormControl(''),
    hartii: new FormControl(''),
    baterii: new FormControl(''),
    calculatoare: new FormControl(''),
    sticla: new FormControl(''),
    chimice: new FormControl(''),
    metalice: new FormControl(''),
    mercur: new FormControl('')
    
    
  })

  formatLabel(value: number | null) {

      return value + 'kg';

  }

  constructor(private centers: CentreService) {

  }

  markers:any;

  ngOnInit() {
    this.centers.getAllCenters().subscribe(resp => {
      console.log(resp);
      this.markers = resp;
      
    }
    )
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }


  zoomIn() {
    if (this.zoom < 15) this.zoom++;
  }
  zoomOut() {
    if (this.zoom > 0) this.zoom--;
  }
}


/*
1. plastic
2. menajere
3. hartii
4. baterii
5. calculatoare
6. sticla
7. chimice
8. metalice
9. mercur

*/