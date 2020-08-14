import { Component} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
  currentAQI = 700
  currentLevel = ''
  currentDescribtion = ''

  healthRecommends:any = []
  moreDetailLink = 'https://www.google.com/'
  
  tiles: Tile[]
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.currentAQI = 115
    switch(this.currentAQI) {
      case 15 : {
        this.currentLevel = 'แดง'
        this.currentDescribtion = 'คุณภาพของอากาศส่งผลต่อสุขภาพ'
        break
      }
    }

    this.tiles = [
      {day: '2', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: 'lightblue'},
      {day: '3', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: 'lightgreen'},
      {day: '4', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: 'lightpink'},
      {day: '5', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: '#DDBDF1'},
      {day: '6', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: '#DDBDF1'},
      {day: '7', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: '#DDBDF1'},
      {day: '8', month: 'มกราคม', year: '2020', value: '80', cols: 1, rows: 1, color: '#DDBDF1'},
    ];

    this.healthRecommends[0] = 'หลีกเลี่ยงกิจกรรมกลางแจ้ง'
    this.healthRecommends[1] = 'ใช้อุปกรณ์ป้องกันฝุ่นควัน'
    this.healthRecommends[2] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
    this.healthRecommends[3] = 'หากมีเหตุการปกติ ให้พบแพทย์โดยด่วน'
  }

  OnClickSource(sorceName:any){
    console.log(sorceName)
  }

}
