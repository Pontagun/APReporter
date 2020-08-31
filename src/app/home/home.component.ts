import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WidgetService } from '../widget.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  day: string;
  month: string;
  year: string;
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentAQI = ''
  currentLevel = ''
  currentDescribtion = ''

  defautIndex = 3;

  healthRecommends: any = []
  moreDetailLink = 'https://www.google.com/'

  aresult: any;
  wresult: any;

  airTiles: Tile[]
  weatherTiles: Tile[]

  monthNames: string[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  data: any
  day = new Date();
  sky = ""
  humidity = ""
  rain = ""
  pressure = ""
  temp = ""
  rain_pop = ""


  constructor(
    private breakpointObserver: BreakpointObserver,
    private widgetService: WidgetService,
    private http: HttpClient
  ) { }

  home(lat: any, lng: any, index: any = this.defautIndex) {
    this.widgetService.getAirIndex(lat, lng, index)
      .subscribe(res => {
        this.aresult = res
        switch (index) {
          case 1:
            {
              break;
            }
          case 2:
            {
              var today = new Date();
              today.setDate(today.getDate()+1)
              
              this.currentAQI = this.aresult["data"]["current"]["pollution"]["aqius"]
              this.airTiles = [
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: "-"
                  , month: "-"
                  , year: "-"
                  , value: "-", cols: 1, rows: 1, color: 'lightblue'
                }
              ];
              break;
            }
          case 3:
            {
              this.currentAQI = this.aresult["data"]["aqi"]
              this.airTiles = [
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][2]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][2]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][2]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][2]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][3]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][3]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][3]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][3]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][4]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][4]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][4]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][4]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][5]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][5]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][5]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][5]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][6]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][6]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][6]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][6]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][7]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][7]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][7]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][7]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                },
                {
                  day: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][8]["day"])).getDate().toString()
                  , month: this.monthNames[(new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][8]["day"])).getMonth()]
                  , year: (new Date(this.aresult["data"]["forecast"]["daily"]["pm25"][8]["day"])).getDate().toString()
                  , value: this.aresult["data"]["forecast"]["daily"]["pm25"][2]["avg"].toString(), cols: 1, rows: 1, color: 'lightblue'
                }
              ];
              break;
            }
        }
      },
        error => {
          console.log('data error !');
        });

    this.widgetService.getWeather(lng, lat).subscribe(res => {
      this.wresult = res

      this.sky = res["current"]["weather"][0]["description"]
      this.humidity = res["current"]["humidity"]
      this.rain = res["daily"][0]["rain"]
      this.pressure = res["current"]["pressure"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.temp = (res["current"]["temp"] - 273.15).toFixed(2).toString()
      this.rain_pop = res["daily"][0]["pop"]

      this.weatherTiles = [
        {
          day: this.widgetService.convertUnixTime(res["daily"][1]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][1]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][1]["dt"]).getFullYear().toString()
          , value: res["daily"][1]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][2]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][2]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][2]["dt"]).getFullYear().toString()
          , value: res["daily"][2]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][3]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][3]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][3]["dt"]).getFullYear().toString()
          , value: res["daily"][3]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][4]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][4]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][4]["dt"]).getFullYear().toString()
          , value: res["daily"][4]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][5]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][5]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][5]["dt"]).getFullYear().toString()
          , value: res["daily"][5]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][6]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][6]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][6]["dt"]).getFullYear().toString()
          , value: res["daily"][6]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
        {
          day: this.widgetService.convertUnixTime(res["daily"][7]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][7]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][7]["dt"]).getFullYear().toString()
          , value: res["daily"][7]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
      ];
    },
      error => {
        console.log('data error !');
      });
  }


  OnClickSource(sorceName: any) {
    console.log(sorceName)
    this.widgetService.getPosition().then(pos => {
      this.home(pos.lat, pos.lng, sorceName)
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }

  ngOnInit() {
    this.widgetService.getPosition().then(pos => {
      this.home(pos.lat, pos.lng)
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });

    this.currentLevel = 'สีแดง'
    this.currentDescribtion = 'คุณภาพของอากาศส่งผลกระทบต่อสุขภาพ'
  }
}
