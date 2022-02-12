import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableHeader } from 'src/app/interfaces/table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private _data: Record<string, any>[] = [];
  public get data() {
    return this._data;
  }
  @Input() public set data(val) {
    this._data = val;
  }

  private _headers: ITableHeader[] = [];
  public get headers() {
    return this._headers;
  }
  @Input() public set headers(val) {
    this._headers = val;
  }

  @Output() recordChange = new EventEmitter<Record<string, any>>();

  constructor() { }

  ngOnInit(): void {
  }

}
