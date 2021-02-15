import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WidgetService } from '../widget.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, throwError, interval } from 'rxjs';
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
  private updateSubscription: Subscription;
  currentAQI = ''
  currentLevel = ''
  currentDescribtion = ''
  currentCardHeadColor = ''
  currentCardBodyColor = ''
  currentCardTxtColor = ''
  currentCardFooterColor = ''
  currentRec = ''

  defautIndex = 4;

  healthRecommends: any = []

  aresult: any;
  wresult: any;

  airTiles: Tile[]
  weatherTiles: Tile[]
  cmucdcScore: number[] = [25, 50, 100, 200]
  aqiScore: number[] = [25, 50, 100, 200]
  aqiCNScore: number[] = [25, 50, 100, 200]
  monthNames: string[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  data: any
  day = new Date();
  sky = ""; humidity = ""; rain = ""; pressure = ""; temp = ""; rain_pop = "";

  airHeadColor = ""
  airBodyColor = ""

  constructor(
    private breakpointObserver: BreakpointObserver,
    private widgetService: WidgetService,
    private http: HttpClient
  ) { }

  home(lat: any, lng: any, index: any = this.defautIndex) {
    this.widgetService.getAirIndex(lat, lng, index)
      .subscribe(res => {
        this.aresult = res
        this.airTiles = [
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' },
          { day: "-", month: "-", year: "-", value: "-", cols: 1, rows: 1, color: 'lightblue' }
        ];
        switch (index) {
          case 1:
            {
              this.currentAQI = this.aresult["us_aqi"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              this.airTiles = [
                {
                  day: new Date().getDate().toString()
                  , month: this.monthNames[(new Date()).getMonth()]
                  , year: new Date().getDate().toString()
                  , value: "ไม่มีข้อมูลพยากรณ์จากแหล่งข้อมูลนี้",
                  cols: 1,
                  rows: 1,
                  color: 'lightblue'
                }
              ]
              break;
            }
          case 2:
            {
              this.currentAQI = this.aresult["data"]["current"]["pollution"]["aqius"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              this.airTiles = [
                {
                  day: new Date().getDate().toString()
                  , month: this.monthNames[(new Date()).getMonth()]
                  , year: new Date().getDate().toString()
                  , value: "ไม่มีข้อมูลพยากรณ์จากแหล่งข้อมูลน้ี",
                  cols: 1,
                  rows: 1,
                  color: 'lightblue'
                }
              ]
              break;
            }
          case 3:
            {
              this.currentAQI = this.aresult["data"]["aqi"]
              this.setAQIcardColor(parseInt(this.currentAQI))
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
                }
                ,
              ];

              for (var i = 0; i < this.airTiles.length; i++) {
                if (parseFloat(this.airTiles[i].value) <= this.aqiCNScore[0]) {
                  this.airTiles[i].color = "blue-text-bg"
                } else if (parseFloat(this.airTiles[i].value) <= this.aqiCNScore[1]) {
                  this.airTiles[i].color = "green-text-bg"
                } else if (parseFloat(this.airTiles[i].value) <= this.aqiCNScore[2]) {
                  this.airTiles[i].color = "yellow-text-bg"
                } else if (parseFloat(this.airTiles[i].value) <= this.aqiCNScore[3]) {
                  this.airTiles[i].color = "orange-text-bg"
                } else if (parseFloat(this.airTiles[i].value) > this.aqiCNScore[3]) {
                  this.airTiles[i].color = "red-text-bg"
                }
              }
              break;
            }
          case 4:
            {
              this.currentAQI = this.aresult["AQI"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              this.airTiles = [
                {
                  day: new Date().getDate().toString()
                  , month: this.monthNames[(new Date()).getMonth()]
                  , year: new Date().getDate().toString()
                  , value: "ไม่มีข้อมูลพยากรณ์จากแหล่งข้อมูลนี้",
                  cols: 1,
                  rows: 1,
                  color: 'lightblue'
                }
              ]
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
      if (this.rain == undefined) {
        this.rain = "0"
      }

      this.pressure = res["current"]["pressure"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.temp = (res["current"]["temp"] - 273.15).toFixed(2).toString()
      this.rain_pop = res["daily"][0]["pop"]

      this.weatherTiles = [
        {
          day: this.widgetService.convertUnixTime(res["daily"][0]["dt"]).getDate().toString()
          , month: this.monthNames[this.widgetService.convertUnixTime(res["daily"][0]["dt"]).getMonth()]
          , year: this.widgetService.convertUnixTime(res["daily"][0]["dt"]).getFullYear().toString()
          , value: res["daily"][0]["weather"][0]["main"], cols: 1, rows: 1, color: 'lightblue'
        },
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
      ];
    },
      error => {
        console.log('data error !');
      });
  }

  OnClickSource(sorceName: any) {
    this.widgetService.getPosition().then(pos => {
      this.home(pos.lat, pos.lng, sorceName)
    });
  }

  setAQIcardColor(currentAQI: Number) {
    if (currentAQI <= 25) {
      this.currentLevel = 'สีฟ้า'
      this.currentDescribtion = 'คุณภาพของอากาศไม่ส่งผลกระทบต่อสุขภาพ'
      this.currentCardHeadColor = 'blue-header-card'
      this.currentCardBodyColor = 'blue-body-card'
      this.currentCardTxtColor = 'blue-font'
      this.currentCardFooterColor = "blue-text-no-margin-btm"
      this.currentRec = this.aresult["suite"][4]["Detail"]
    } else if (currentAQI <= 50) {
      this.currentLevel = 'สีเขียว'
      this.currentDescribtion = 'คุณภาพของอากาศไม่ส่งผลกระทบต่อสุขภาพ'
      this.currentCardHeadColor = 'green-header-card'
      this.currentCardBodyColor = 'green-body-card'
      this.currentCardTxtColor = 'green-font'
      this.currentCardFooterColor = "green-text-no-margin-btm"
      this.currentRec = this.aresult["suite"][3]["Detail"]
    } else if (currentAQI <= 100) {
      this.currentLevel = 'สีเหลือง'
      this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อย'
      this.currentCardHeadColor = 'yellow-header-card'
      this.currentCardBodyColor = 'yellow-body-card'
      this.currentCardTxtColor = 'yellow-font'
      this.currentCardFooterColor = "yellow-text-no-margin-btm"
      this.currentRec = this.aresult["suite"][2]["Detail"]
    } else if (currentAQI <= 200) {
      this.currentLevel = 'สีส้ม'
      this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อยปานกลาง'
      this.currentCardHeadColor = 'orange-header-card'
      this.currentCardBodyColor = 'orange-body-card'
      this.currentCardTxtColor = 'orange-font'
      this.currentCardFooterColor = "orange-text-no-margin-btm"
      this.currentRec = this.aresult["suite"][1]["Detail"]
    } else if (currentAQI > 200) {
      this.currentLevel = 'สีแดง'
      this.currentDescribtion = 'คุณภาพของอากาศส่งผลกระทบต่อสุขภาพ'
      this.currentCardHeadColor = 'red-header-card'
      this.currentCardBodyColor = 'red-body-card'
      this.currentCardTxtColor = 'red-font'
      this.currentCardFooterColor = "red-text-no-margin-btm"
      this.currentRec = this.aresult["suite"][0]["Detail"]
    }
  }

  ngOnInit() {
    this.widgetService.getPosition().then(pos => {
      this.home(pos.lat, pos.lng)
    });
    this.updateSubscription = interval(1000 * 60 * 60).subscribe(
      (val) => {
        this.widgetService.getPosition().then(pos => {
          this.home(pos.lat, pos.lng)
        });
      });
  }
}
