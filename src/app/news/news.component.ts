import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor() { }
  page = 4
  pageSize = 3

  ngOnInit(): void {
  }

  items: string[] = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'A', 'A', 'A', 'A']

}
