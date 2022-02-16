import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { IDateFilterEvent, IFilterEvent, ITableHeader, ITableSort } from 'src/app/interfaces/table.interfaces';

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
    this.createForm();
  }

  private _disableActions = false;
  @Input() public set disableActions(val: boolean) {
    this._disableActions = val;
  }
  public get disableActions(): boolean {
    return this._disableActions;
  }

  @Output() recordChange = new EventEmitter<Record<string, any>>();
  @Output() filter = new EventEmitter<IFilterEvent>();
  @Output() dateFilter = new EventEmitter<IDateFilterEvent>()
  @Output() sort = new EventEmitter<ITableSort>();

  public filterForm: FormGroup;
  public dateFilterForm: FormGroup;
  public recordForm: FormGroup = this.fb.group({});

  public editingItem: number | null = null;

  public sortData: ITableSort = {
    header: this.headers[0],
    direction: ''
  };

  constructor(
    public fb: FormBuilder
  ) { }

  private createForm(): void {
    const group: Record<string, FormControl> = {};
    const dateGroup: Record<string, FormGroup> = {};
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

  public enableEdit(data: Record<string, string | number>, index: number) {
    this.editingItem = index;
  }

  public rowUpdate(item: any, attribute: string, event: Event) {
    this.recordChange.emit({ ...item, [attribute]: (event.target as HTMLInputElement).value });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
