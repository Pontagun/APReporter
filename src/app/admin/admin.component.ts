import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { WidgetService } from '../widget.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  red_rec: String
  ora_rec: String
  yel_rec: String
  gre_rec: String
  blu_rec: String
  wikiURL: String
  myTextarea
  breakpoint = 3;
  breakpoint2 = 1;
  rowHeight = 330;
  constructor(private widgetService: WidgetService,) { }

  ngOnInit(): void {
    this.blu_rec = ""
    this.widgetService.getHealthReccommendation().subscribe(res => {
      this.red_rec = res[0]["Detail"]
      this.ora_rec = res[1]["Detail"]
      this.yel_rec = res[2]["Detail"]
      this.gre_rec = res[3]["Detail"]
      this.blu_rec = res[4]["Detail"]
      this.wikiURL = this.widgetService.wikiURL
    },
    error => {
      console.log('data error !');
    });

    this.breakpoint = (window.innerWidth <= 920) ? 4 : 3;
    this.breakpoint2 = (window.innerWidth <= 500) ? 4 : (window.innerWidth <= 920) ? 2 : 1;
    this.rowHeight = (window.innerWidth <= 500) ? 170 : (window.innerWidth <= 920) ? 220 :  330;
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
  }

  submit() {
    this.widgetService.setHealthReccommendation(this.red_rec, this.ora_rec, this.yel_rec, this.gre_rec, this.blu_rec)
      .subscribe(res => {
        if (res["result"] == 200) {
          window.location.reload();
        }
      },
        error => {
          console.log('data error !');
        });

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 920) ? 4 : 3;
    this.breakpoint2 = (event.target.innerWidth <= 500) ? 4 : (event.target.innerWidth <= 920) ? 2 : 1;
    this.rowHeight = (window.innerWidth <= 920) ? 170 : 330;
  }
}