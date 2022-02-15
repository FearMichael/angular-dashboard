import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { ITableHeader, ITableSort } from 'src/app/interfaces/table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

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
    this.filterForm = this.createForm();
  }

  @Output() recordChange = new EventEmitter<Record<string, any>>();
  @Output() filter = new EventEmitter<{ header: string, value: string | number }[]>();
  @Output() sort = new EventEmitter<ITableSort>();

  public filterForm: FormGroup;

  public sortData: ITableSort = {
    header: this.headers[0],
    direction: ''
  };

  constructor() { }

  private createForm() {
    const group: Record<string, FormControl> = {};
    this.headers.forEach((header) => group[header.value] = new FormControl(''));
    return new FormGroup(group);
  }

  public sortTable(header: ITableHeader) {
    const data: ITableSort = {
      header,
      direction: ''
    };
    switch (this.sortData?.direction) {
      case 'ASC':
        data.direction = 'DESC';
        break;
      case 'DESC':
        data.direction = '';
        break;
      default:
        data.direction = 'ASC';
    }
    this.sortData = data;
    this.sort.emit(this.sortData);
  }

  ngOnInit(): void {
    const filterSub = this.filterForm.valueChanges.pipe(tap((v) => console.log(v))).subscribe((form) => this.filter.emit(form));
    this.subscriptions.push(filterSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
