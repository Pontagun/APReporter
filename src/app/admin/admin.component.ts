import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  color: string;
  name: string;
  detail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {color: '', name: 'Hydrogen', detail: 'He'},
  {color: '', name: 'Helium', detail: 'He'},
  {color: '', name: 'Lithium', detail: 'Li'},
  {color: '', name: 'Beryllium', detail: 'Be'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['color', 'name', 'detail'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
