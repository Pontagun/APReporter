import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) { }
  data: any;

  airURL = ""
  weatherURL = ""
  newsURL = ""

  url = "https://airkm-api.datascience.cmu.ac.th/"


  getAirIndex(lat, lng, id): Observable<any> {
    switch (id) {
      case 1: {
        // cmuccdc
        this.airURL = this.url + "/dustboy?station=6"
        break
      }
      case 2: {
        // IQAir
        this.airURL = this.url + "/iqair?lat=" + lat + "&lon=" + lng
        break
      }
      case 3: {
        // AQICN
        this.airURL = this.url + "/aqicn?lat=" + lat + "&lon=" + lng
        break
      }
    }
    return this.http
      .get(this.airURL).
      pipe(map(response => { return response; }));
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getWeather(lng, lat): Observable<any> {
    this.weatherURL = this.url + "/weather?lat=" + lat + "&lon=" + lng
    return this.http
      .get(this.weatherURL).
      pipe(map(response => { return response; }));
  }

  getNews(): Observable<any> {
    this.newsURL = this.url + "/news"
    return this.http
      .get(this.newsURL).
      pipe(map(response => { return response; }));
  }

  getWiki(): Observable<any> {
    this.newsURL = this.url + "/wiki"
    return this.http
      .get(this.newsURL).
      pipe(map(response => { return response; }));
  }

  convertUnixTime(tUnix: any) {
    var date = new Date(tUnix * 1000);
    return date;
  }

}
