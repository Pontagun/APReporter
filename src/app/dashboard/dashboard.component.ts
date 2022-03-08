import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Observable, Subscription, interval } from 'rxjs';
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
  private updateSubscription: Subscription;
  title = 'My first AGM project';
  lat = 0;
  lng = 0;
  currentAQI = ''
  currentLevel = ''
  currentDescribtion = ''
  aresult: any;
  healthRecommends: any = []
  moreDetailLink = 'https://www.google.com/'
  wikiLink = this.widgetService.wikiURL
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
  no2: string = "รับข้อมูล";
  so2: string = "รับข้อมูล";
  o3: string = "รับข้อมูล";
  co: string = "รับข้อมูล";
  pm10: string = "รับข้อมูล";
  pm25: string = "รับข้อมูล";
  constructor(private breakpointObserver: BreakpointObserver,
    private widgetService: WidgetService,
    private http: HttpClient) {
    // this.healthRecommends[0] = 'หลีกเลี่ยงกิจกรรมกลางแจ้ง'
    // this.healthRecommends[1] = 'ใช้อุปกรณ์ป้องกันฝุ่นควัน'
    // this.healthRecommends[2] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
  }

  home(lat: any, lng: any, index: any = this.defautIndex) {
    this.widgetService.getAirIndex(lat, lng, index)
      .subscribe(res => {
        this.aresult = res
        // this.no2 = "-"
        // this.so2 = "-"
        // this.co = "-"
        // this.o3 = "-"
        // this.pm10 = "-"
        // this.pm25 = "-"
        switch (index) {
          case 1:
            {
              this.currentAQI = this.aresult["us_aqi"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              break;
            }
          case 2:
            {
              this.currentAQI = this.aresult["data"]["current"]["pollution"]["aqius"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              break;
            }
          case 3:
            {
              this.currentAQI = this.aresult["data"]["aqi"]
              // this.no2 = "-"
              // this.so2 = "-"
              // this.co = "-"
              // this.o3 = this.aresult["data"]["forecast"]["daily"]["o3"][2]["avg"]
              // this.pm10 = this.aresult["data"]["iaqi"]["pm10"]["v"]
              // this.pm25 = this.aresult["data"]["iaqi"]["pm25"]["v"]
              this.setAQIcardColor(parseInt(this.currentAQI))
              break;
            }
          case 4:
            {
              this.currentAQI = (this.aresult["AQI"] === null) ? "ไม่มีข้อมูล" : this.aresult["AQI"];
              this.no2 = (this.aresult["NO2"] === null) ? "ไม่มีข้อมูล" : this.aresult["NO2"];
              this.so2 = (this.aresult["SO2"] === null) ? "ไม่มีข้อมูล" : this.aresult["SO2"];
              this.co = (this.aresult["CO"] === null) ? "ไม่มีข้อมูล" : this.aresult["CO"];
              this.o3 = (this.aresult["O3"] === null) ? "ไม่มีข้อมูล" : this.aresult["O3"];
              this.pm10 = (this.aresult["PM10"] === null) ? "ไม่มีข้อมูล" : this.aresult["PM10"];
              this.pm25 = (this.aresult["PM25"] === null) ? "ไม่มีข้อมูล" : this.aresult["PM25"];
              this.setAQIcardColor(parseInt(this.currentAQI))
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
      if (this.rain == undefined) { this.rain = "0" }
      this.pressure = res["current"]["pressure"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.temp = (res["current"]["temp"] - 273.15).toFixed(2).toString()
      this.rain_pop = res["daily"][0]["pop"]
    },
      error => {
        console.log('data error !');
      });
  }

  OnClickSource(sourceName: any) {
    this.widgetService.getPosition().then(pos => {
      this.home(pos.lat, pos.lng, sourceName)
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
    } else if (currentAQI <= 50) {
      this.currentLevel = 'สีเขียว'
      this.currentDescribtion = 'คุณภาพของอากาศไม่ส่งผลกระทบต่อสุขภาพ'
      this.currentCardHeadColor = 'green-header-card'
      this.currentCardBodyColor = 'green-body-card'
      this.currentCardTxtColor = 'green-font'
      this.currentCardFooterColor = "green-text-no-margin-btm"
    } else if (currentAQI <= 100) {
      this.currentLevel = 'สีเหลือง'
      this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อย'
      this.currentCardHeadColor = 'yellow-header-card'
      this.currentCardBodyColor = 'yellow-body-card'
      this.currentCardTxtColor = 'yellow-font'
      this.currentCardFooterColor = "yellow-text-no-margin-btm"
    } else if (currentAQI <= 200) {
      this.currentLevel = 'สีส้ม'
      this.currentDescribtion = 'คุณภาพของอากาศเริ่มส่งผลกระทบต่อสุขภาพเล็กน้อยปานกลาง'
      this.currentCardHeadColor = 'orange-header-card'
      this.currentCardBodyColor = 'orange-body-card'
      this.currentCardTxtColor = 'orange-font'
      this.currentCardFooterColor = "orange-text-no-margin-btm"
    } else if (currentAQI > 200) {
      this.currentLevel = 'สีแดง'
      this.currentDescribtion = 'คุณภาพของอากาศส่งผลกระทบต่อสุขภาพ'
      this.currentCardHeadColor = 'red-header-card'
      this.currentCardBodyColor = 'red-body-card'
      this.currentCardTxtColor = 'red-font'
      this.currentCardFooterColor = "red-text-no-margin-btm"
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