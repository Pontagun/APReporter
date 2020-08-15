import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
  currentAQI = 500
  currentLevel = ''
  currentDescribtion = ''

  healthRecommends: any = []
  moreDetailLink = 'https://www.google.com/'

  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 3, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.currentAQI = 300
    switch (this.currentAQI) {
      case 15: {
        this.currentLevel = 'แดง'
        this.currentDescribtion = 'คุณภาพของอากาศส่งผลต่อสุขภาพ'
        break
      }
    }

    this.healthRecommends[0] = 'หลีกเลี่ยงกิจกรรมกลางแจ้ง'
    this.healthRecommends[1] = 'ใช้อุปกรณ์ป้องกันฝุ่นควัน'
    this.healthRecommends[2] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
    this.healthRecommends[3] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
  }

  OnClickSource(sorceName: any) {
    console.log(sorceName)
  }
}