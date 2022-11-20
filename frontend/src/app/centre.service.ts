import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentreService {


  constructor(private httpClient: HttpClient) { }
  url = "http://20.224.177.74:5000"

  // getAllCenters(){
  //   return this.httpClient.get(this.url + '/api/v1/centers/')
  //     .pipe(map((resp: any) => resp.json())
  //     )
  // }
  getAllCenters(){
    return this.httpClient.request('GET', this.url + '/api/v1/centers/', {responseType:'json'});

  }

  getAllActivies() {
    return this.httpClient.request('GET', this.url + '/api/v1/activities/', {responseType:'json'} )
  }

  
  postNewRecycleCenter(data: any){
    return this.httpClient.post(this.url + '/api/v1/centers/center', data)
  
  }
  
  postNewActivity(data: any) {
    return this.httpClient.post(this.url + '/api/v1/activities/activity', data)
  }
}
