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
  wikiLink = 'https://airkm-admin.datascience.cmu.ac.th'
  constructor(private widgetService: WidgetService,) { }

  ngOnInit() {
    this.widgetService.getSpecialist()
      .subscribe(res => {
        this.people = res
      },
        error => {
          console.log('data error !');
        });
  }



}
