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
  aqiCNToken = "6f0bd0ed71ccee8988757f353b8a920deaa0741a"
  IQAireToken = "82dabd61-cb09-4a09-b82b-8d724f4d6e5e"

  weatherToken = "220aabafd04062943967fc23974cc8d5"

  getAirIndex(lat, lng, id): Observable<any> {
    switch (id) {
      case 1: {
        // cmuccdc
        this.airURL = "https://www.cmuccdc.org/api/ccdc/value/6"
        console.log(this.airURL)
        break
      }
      case 2: {
        // IQAir
        this.airURL = "https://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lng + "&key=" + this.IQAireToken
        console.log(this.airURL)
        break
      }
      case 3: {
        // AQICN
        this.airURL = "https://api.waqi.info/feed/geo:" + lat + ";" + lng + "/?token=" + this.aqiCNToken
        console.log(this.airURL)
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
    this.weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="
      + lat + "&lon=" + lng + "&exclude=minutely,hourly&appid=" + this.weatherToken
    return this.http
      .get(this.weatherURL).
      pipe(map(response => { return response; }));
  }

  convertUnixTime(tUnix: any) {
    var date = new Date(tUnix * 1000);
    return date;
  }
}
