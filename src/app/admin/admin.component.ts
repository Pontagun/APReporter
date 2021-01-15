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
  wikiURL: String
  myTextarea
  constructor(private widgetService: WidgetService,) { }

  ngOnInit(): void {
    this.widgetService.getHealthReccommendation().subscribe(res => {
      this.red_rec = res[0]["Detail"]
      this.ora_rec = res[1]["Detail"]
      this.yel_rec = res[2]["Detail"]
      this.gre_rec = res[3]["Detail"]
      this.wikiURL = this.widgetService.wikiURL
    },
      error => {
        console.log('data error !');
      });
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
  }

  submit() {
    this.widgetService.setHealthReccommendation(this.red_rec, this.ora_rec, this.yel_rec, this.gre_rec)
      .subscribe(res => {
        if (res["result"] == 200) {
          window.location.reload();
        }
      },
        error => {
          console.log('data error !');
        });

  }
}