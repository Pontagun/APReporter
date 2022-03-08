import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { map } from 'rxjs/operators';

export interface IRecomendation {
  red: String;
  orange: String;
  yellow: String;
  green: String;
  blue: String;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) { }
  data: any;

  airURL = ""
  weatherURL = ""
  newsURL = ""
  specialistURL = ""
  rec: IRecomendation
  wikiURL = "https://airkm-admin.datascience.cmu.ac.th"
  url = "https://airkm-api.datascience.cmu.ac.th"
  // url = "http://0.0.0.0:80";


  getAirIndex(lat, lng, id): Observable<any> {
    switch (id) {
      case 1: {
        // cmuccdc
        this.airURL = this.url + "/dustboy?station=6"
        break
      }
      case 2: {
        // IQAir
        this.airURL = "https://airkm-backend.docker.titipat.net/api/iqair?lat=" + lat + "&lon=" + lng
        break
      }
      case 3: {
        // AQICN
        this.airURL = this.url + "/aqicn?lat=" + lat + "&lon=" + lng
        break
      }
      case 4: {
        // IQAir
        this.airURL = this.url + "/air4thai?lat=" + lat + "&lon=" + lng
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
        () => {
          console.log(`User doesn't allow the location service. Using Chiang Mai as default location.`)
          resolve({
            lng: 98.979263,
            lat: 18.796143
          })
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

  getSpecialist(): Observable<any> {
    this.specialistURL = this.url + "/specialist"
    return this.http
      .get(this.specialistURL).
      pipe(map(response => { return response; }));
  }

  getHealthReccommendation(): Observable<any> {
    this.specialistURL = this.url + "/recommendation"
    return this.http
      .get(this.specialistURL).
      pipe(map(response => { return response; }));
  }

  setHealthReccommendation(arg1: String, arg2: String, arg3: String, arg4: String, arg5: String): Observable<any> {
    this.rec = { red: arg1, orange: arg2, yellow: arg3, green: arg4, blue: arg5 }
    this.specialistURL = this.url + "/recommendation"
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.rec);
    console.log(body)
    return this.http
      .put(this.specialistURL, body, { 'headers': headers }).
      pipe(map(response => { return response; }));
  }

  convertUnixTime(tUnix: any) {
    var date = new Date(tUnix * 1000);
    return date;
  }

}
