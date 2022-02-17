import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';
import { IDateFilterEvent, IFilterEvent, ITableConfig, ITableHeader, ITableSort } from 'src/app/interfaces/table.interfaces';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends { id: string | number }> implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  private _data: T[] = [] as T[];
  public get data(): T[] {
    return this._data;
  }
  @Input() public set data(val: T[]) {
    this._data = val;
  }

  private _headers: ITableHeader<T>[] = [];
  public get headers() {
    return this._headers;
  }
  @Input() public set headers(val) {
    this._headers = val;
    this.createForm();
  }

  private _config: ITableConfig;
  @Input() public set config(val: ITableConfig) {
    this._config = val;
  }
  public get config(): ITableConfig {
    console.log(this._config);
    return this._config;
  }

  @Output() recordChange = new EventEmitter<Record<string, any>>();
  @Output() filter = new EventEmitter<IFilterEvent>();
  @Output() dateFilter = new EventEmitter<IDateFilterEvent>()
  @Output() sort = new EventEmitter<ITableSort<T>>();

  public filterForm: FormGroup;
  public dateFilterForm: FormGroup;

  public editingItem: T = {} as T;

  public sortData: ITableSort<T> = {
    header: this.headers[0],
    direction: ''
  };

  constructor(
    public fb: FormBuilder
  ) { }

  private createForm(): void {
    // Cleanup on form creation
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    const group: Record<any, FormControl> = {};
    const dateGroup: Record<any, FormGroup> = {};
    this.headers.forEach((header) => {
      if (header.format === 'date') {
        dateGroup[header.value] = new FormGroup({
          startDate: new FormControl(''),
          endDate: new FormControl(''),
        });
      } else group[header.value] = new FormControl('')
    });
    this.filterForm = new FormGroup(group);
    this.dateFilterForm = new FormGroup(dateGroup);
    const filterSub = this.filterForm.valueChanges.subscribe((form) => this.filter.emit(form));
    const dateFilterSub = this.dateFilterForm.valueChanges.subscribe((dateForm) => this.dateFilter.emit(dateForm));
    this.subscriptions.push(filterSub, dateFilterSub);
  }

  public sortTable(header: ITableHeader<T>) {
    const data: ITableSort<T> = {
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

  public enableEdit(row: any) {
    this.editingItem = { ...row };
  }

  public resetEdit() {
    this.editingItem = {} as T;
  }

  public rowUpdate() {
    this.recordChange.emit(this.editingItem);
    this.resetEdit();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
