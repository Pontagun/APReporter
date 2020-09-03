import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { WidgetService } from '../widget.service';
import { HttpClient } from '@angular/common/http';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  currentAQI = 0
  currentLevel = ''
  currentDescribtion = ''
  aresult: any;
  healthRecommends: any = []
  moreDetailLink = 'https://www.google.com/'
  wresult: any;

  currentCardHeadColor = ''
  currentCardBodyColor = ''
  currentCardTxtColor = ''
  currentCardFooterColor = ''

  sky = ""
  humidity = ""
  rain = ""
  pressure = ""
  temp = ""
  rain_pop = ""
  minTemp = ""
  maxTemp = ""
  defautIndex = 3;
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 3, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  no2: string; so2: string; o3: string; co: string; pm10: string; pm25: string;
  constructor(private breakpointObserver: BreakpointObserver,
    private widgetService: WidgetService,
    private http: HttpClient) {
    // this.currentAQI = 300
    // switch (this.currentAQI) {
    //   case 15: {
    //     this.currentLevel = 'แดง'
    //     this.currentDescribtion = 'คุณภาพของอากาศส่งผลต่อสุขภาพ'
    //     break
    //   }
    // }

    // this.healthRecommends[0] = 'หลีกเลี่ยงกิจกรรมกลางแจ้ง'
    // this.healthRecommends[1] = 'ใช้อุปกรณ์ป้องกันฝุ่นควัน'
    // this.healthRecommends[2] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
    // this.healthRecommends[3] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
  }

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
              this.currentAQI = this.aresult["data"]["current"]["pollution"]["aqius"]
              this.no2 = "-"
              this.so2 = "-"
              this.co = "-"
              this.o3 = "-"
              this.pm10 = "-"
              this.pm25 = "-"
              break;
            }
          case 3:
            {
              this.currentAQI = this.aresult["data"]["aqi"]
              this.no2 = "-"
              this.so2 = "-"
              this.co = "-"
              this.o3 = this.aresult["data"]["forecast"]["daily"]["o3"][2]["avg"]
              this.pm10 = this.aresult["data"]["iaqi"]["pm10"]["v"]
              this.pm25 = this.aresult["data"]["iaqi"]["pm25"]["v"]

              if (this.currentAQI <= 50) {
                this.currentLevel = 'สีเขียว'
                this.currentDescribtion = 'คุณภาพของอากาศไม่ส่งผลกระทบต่อสุขภาพ'
                this.currentCardHeadColor = 'green-header-card'
                this.currentCardBodyColor = 'green-body-card'
                this.currentCardTxtColor = 'green-font'
                this.currentCardFooterColor = "green-text-no-margin-btm"
              } else if (this.currentAQI <= 100) {
                this.currentLevel = 'สีเหลือง'
                this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อย'
                this.currentCardHeadColor = 'yellow-header-card'
                this.currentCardBodyColor = 'yellow-body-card'
                this.currentCardTxtColor = 'yellow-font'
                this.currentCardFooterColor = "yellow-text-no-margin-btm"
              } else if (this.currentAQI <= 150) {
                this.currentLevel = 'สีส้ม'
                this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อยปานกลาง'
                this.currentCardHeadColor = 'orange-header-card'
                this.currentCardBodyColor = 'orange-body-card'
                this.currentCardTxtColor = 'orange-font'
                this.currentCardFooterColor = "orange-text-no-margin-btm"
              } else if (this.currentAQI <= 200) {
                this.currentLevel = 'สีแดง'
                this.currentDescribtion = 'คุณภาพของอากาศส่งผลกระทบต่อสุขภาพ'
                this.currentCardHeadColor = 'red-header-card'
                this.currentCardBodyColor = 'red-body-card'
                this.currentCardTxtColor = 'red-font'
                this.currentCardFooterColor = "red-text-no-margin-btm"
              }

              break;
            }
        }
      },
        error => {
          console.log('data error !');
        });
    this.widgetService.getWeather(lng, lat).subscribe(res => {
      this.wresult = res
      this.minTemp = (res["daily"][0]["temp"]["min"] - 273.15).toFixed(2).toString()
      this.maxTemp = (res["daily"][0]["temp"]["max"] - 273.15).toFixed(2).toString()
      this.sky = res["current"]["weather"][0]["description"]
      this.humidity = res["current"]["humidity"]
      this.rain = res["daily"][0]["rain"]
      this.pressure = res["current"]["pressure"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.temp = (res["current"]["temp"] - 273.15).toFixed(2).toString()
      this.rain_pop = res["daily"][0]["pop"]
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
  }
}