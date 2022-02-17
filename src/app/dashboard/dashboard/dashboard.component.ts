import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { IDashboardSummaryData, IDashboardTableData } from 'src/app/interfaces/dashboard.interfaces';
import { IDateFilterEvent, IFilterEvent, ITableFilter, ITableHeader, ITableSort } from 'src/app/interfaces/table.interfaces';
import { mockData } from '../mockData';
dayjs.extend(isBetween);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tableHeaders: ITableHeader<IDashboardTableData>[] = [
    { value: 'title', text: 'Title', route: true },
    { value: 'division', text: 'Division' },
    { value: 'project_owner', text: 'Project Owner', editable: true },
    { value: 'budget', text: 'Budget', format: 'currency', editable: true },
    { value: 'status', text: 'Status', editable: true },
    { value: 'created', text: 'Created', format: 'date' },
    { value: 'modified', text: 'Modified', format: 'date' },
  ];

  private _tableData: IDashboardTableData[] = mockData.map((e, i) => ({ id: i, ...e }));
  public get tableData() {
    const filtered = this.filterTable(this._tableData);
    const dateFiltered = this.dateFilterTable(filtered);
    const sorted = this.sortTable(dateFiltered);
    return sorted;
  }

  public get summaryData(): IDashboardSummaryData[] {

    const { budget, status, highBudget, lowBudget } = [...this._tableData].sort((a, b) => a.budget > b.budget ? 1 : 0).reduce((prev, curr) => {
      // Budget total
      prev.budget += typeof curr.budget === 'string' ? parseFloat(curr.budget) : curr.budget;
      // High Budget Calc
      if (prev.highBudget?.budget < curr.budget) {
        prev.highBudget = {
          budget: curr.budget,
          name: curr.project_owner,
        }
      }
      // Low budget calc
      if (prev.lowBudget.budget === 0 || prev.lowBudget.budget > curr.budget) {
        prev.lowBudget = {
          budget: curr.budget,
          name: curr.project_owner
        }
      }
      // Status count
      const found = prev.status.find((elem) => elem.name === curr.status);
      if (found) found.count++;
      else prev.status.push({ name: curr.status, count: 1 });

      return prev;

    }, {
      budget: 0,
      status: [] as { name: string, count: number }[],
      highBudget: { budget: 0, name: '' },
      lowBudget: { budget: 0, name: '' },
    });
    return [{ id: 0, budget, status: status.map(({ name, count }) => `${name}: ${count}`).join(' '), highBudget: highBudget.name, lowBudget: lowBudget.name }];
  };

  public summaryHeaders: ITableHeader<IDashboardSummaryData>[] = [
    { value: "budget", text: 'Budget Totals', format: 'currency' },
    { value: "status", text: 'Status' },
    { value: "highBudget", text: 'Highest Budget Owner' },
    { value: "lowBudget", text: 'Lowest Budget Owner' },
  ]

  public tableFilter: ITableFilter;
  public tableDateFilter: IDateFilterEvent;
  public sort: ITableSort<IDashboardTableData>

  public get totalBudget(): number {
    return this._tableData.reduce((prev, curr) => {
      const val = prev + (curr?.budget || 0);
      return val
    }, 0);
  }

  public get totalStatus(): { name: string, count: number }[] {
    return this._tableData.reduce((prev, curr) => {
      const found = prev.find((elem) => elem.name === curr.status);
      if (found) found.count++;
      else prev.push({ name: curr.status, count: 1 });
      return prev;
    }, [] as { name: string, count: number }[])
  }

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  public filterTable(data: IDashboardTableData[]) {
    if (!this.tableFilter) return data;
    const filterKeys = Object.keys(this.tableFilter).filter((k) => !!this.tableFilter[k]);
    return filterKeys.length ? this._tableData.filter((data: Record<string, any>) => {
      const shouldReturn = filterKeys.every((k) => {
        const val = this.tableFilter[k];
        return data[k]?.toString()?.toLowerCase()?.includes(val.toString()?.toLowerCase());
      });
      return shouldReturn
    }) : [...this._tableData];
  }

  public dateFilterTable(data: IDashboardTableData[]) {
    if (!this.tableDateFilter) return data;
    const filterKeys = Object.keys(this.tableDateFilter).filter((k) => Boolean(this.tableDateFilter[k].startDate));
    const filtered = filterKeys.length ? this._tableData.filter((record) => {
      return filterKeys.every((k) => {
        const val = (this.tableDateFilter as any)[k];
        const item = (record as any)[k];
        if (!item) return false;
        const shouldReturn = dayjs(item).isBetween(val.startDate || dayjs(), val.endDate || dayjs(), null, '[]');
        return shouldReturn;
      });
    }) : [...data];
    return filtered;
  }

  public sortTable(data: IDashboardTableData[]) {
    console.log(this.sort);
    if (!this.sort) return data;
    const { header, direction } = this.sort;
    const headerValue = header.value;
    if (direction === '') {
      return [...data];
    }
    return [...data].sort((a: any, b: any) => {
      let val = 0;
      const multiplier = direction === 'DESC' ? -1 : 1;
      if (a[headerValue] > b[headerValue]) val = 1;
      else if (b[headerValue] > a[headerValue]) val = -1;
      return val * multiplier;
    })
  }

  public updateData(record: any) {
    const found = this._tableData.findIndex(({ id }) => id === record.id);
    const data = [...this._tableData];
    data[found] = record;
    this._tableData = data;
    this._snackBar.open(`Record ${record.id} updated!`, 'close', { duration: 2000 });
  }

  ngOnInit(): void {
  }

}
