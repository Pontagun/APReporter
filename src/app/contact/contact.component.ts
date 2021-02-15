import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';

export interface Specialist {
  email: string;
  id: string;
  memberof: string;
  name: string;
  position: string;
  tel: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  people: Specialist[] = [];
  wikiLink = this.widgetService.wikiURL
  public breakpoint = 4;
  constructor(private widgetService: WidgetService,) { }

  ngOnInit() {
    this.widgetService.getSpecialist()
    .subscribe(res => {
      this.people = res
    },
    error => {
      console.log('data error !');
    });

    this.breakpoint = (window.innerWidth <= 420) ? 1 : 4;

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 4;
  }



}
