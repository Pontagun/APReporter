import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(
    private config: NgbCarouselConfig,
    private widgetService: WidgetService,
  ) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  linkPath = "http://localhost:3000/en/"

  page = 4
  pageSize = 3
  showNavigationArrows = false;
  showNavigationIndicators = false;

  head: any;
  idHeadline: number
  imgHeadline = ""
  headline = ""
  captionHeadline = ""
  pathHeadline = ""

  images = []
  titles = []
  paths = []
  ids = []

  historyNews = []

  ngOnInit() {
    this.widgetService.getNews()
      .subscribe(res => {

        this.head = res.shift();
        this.historyNews = res

        this.idHeadline = this.head["id"]
        this.imgHeadline = 'assets/image/' + this.head["image"] //this.images[0]
        this.headline = this.head["title"]
        this.pathHeadline = this.linkPath + this.head["path"]

        for (let n of res) {
          n["image"] = 'assets/image/' + n["image"]
          n["path"] = this.linkPath + n["path"]

          // this.images.push(n["image"])
          // this.titles.push(n["titles"])
          // this.paths.push(n["path"])
          // this.ids.push(n["id"])
        }
      },
        error => {
          console.log('data error !');
        });
  }
}
