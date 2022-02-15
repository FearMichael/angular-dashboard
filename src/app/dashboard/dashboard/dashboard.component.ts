import { Component, OnInit } from '@angular/core';
import { ITableFilter, ITableHeader, ITableSort } from 'src/app/interfaces/table.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tableHeaders: ITableHeader[] = [
    { value: "title", text: 'Title' },
    { value: "division", text: 'Division' },
    { value: "project_owner", text: 'Project Owner' },
    { value: "budget", text: 'Budget', format: 'currency' },
    { value: "status", text: 'Status' },
    { value: "created", text: 'Created', format: 'date' },
    { value: "modified", text: 'Modified', format: 'date' },
  ];

  private _tableData = [{
    "title": "Tagtune",
    "division": "Accounting",
    "project_owner": "Kevin Snyder",
    "budget": 20614.14,
    "status": "archived",
    "created": "09/14/2015",
    "modified": "10/02/2015"
  }, {
    "title": "Oyoyo",
    "division": "Administration",
    "project_owner": "Eugene Brown",
    "budget": 22106.44,
    "status": "new",
    "created": "07/17/2015",
    "modified": null
  }, {
    "title": "Lajo",
    "division": "Marketing",
    "project_owner": "Killgore Trout",
    "budget": 15481.27,
    "status": "working",
    "created": "07/19/2015",
    "modified": "09/17/2015"
  }, {
    "title": "Blognation",
    "division": "Administration",
    "project_owner": "Richard Henry",
    "budget": 24017.98,
    "status": "working",
    "created": "08/03/2015",
    "modified": "09/17/2015"
  }, {
    "title": "Vinte",
    "division": "Administration",
    "project_owner": "Michelle Webb",
    "budget": 12935.84,
    "status": "working",
    "created": "08/05/2015",
    "modified": "09/15/2015"
  }, {
    "title": "Aibox",
    "division": "Administration",
    "project_owner": "Killgore Trout",
    "budget": 15991.78,
    "status": "working",
    "created": "09/03/2015",
    "modified": "10/02/2015"
  }, {
    "title": "Buzzdog",
    "division": "Administration",
    "project_owner": "Michelle Webb",
    "budget": 22610.09,
    "status": "archived",
    "created": "07/26/2015",
    "modified": "10/01/2015"
  }, {
    "title": "Plambee",
    "division": "Sales",
    "project_owner": "Michelle Webb",
    "budget": 14229.02,
    "status": "archived",
    "created": "09/14/2015",
    "modified": "10/01/2015"
  }, {
    "title": "Photobug",
    "division": "Administration",
    "project_owner": "James Holden",
    "budget": 10959.29,
    "status": "working",
    "created": "09/03/2015",
    "modified": "09/18/2015"
  }, {
    "title": "Quimm",
    "division": "Marketing",
    "project_owner": "James Holden",
    "budget": 14139.38,
    "status": "delivered",
    "created": "08/02/2015",
    "modified": "09/26/2015"
  }, {
    "title": "Innojam",
    "division": "Sales",
    "project_owner": "Eugene Brown",
    "budget": 24318.05,
    "status": "working",
    "created": "09/13/2015",
    "modified": "09/20/2015"
  }, {
    "title": "Jaxworks",
    "division": "Production",
    "project_owner": "Michelle Webb",
    "budget": 15054.27,
    "status": "new",
    "created": "08/12/2015",
    "modified": null
  }, {
    "title": "Skyble",
    "division": "Accounting",
    "project_owner": "Richard Henry",
    "budget": 13810.1,
    "status": "delivered",
    "created": "07/12/2015",
    "modified": "09/21/2015"
  }, {
    "title": "Photobean",
    "division": "Marketing",
    "project_owner": "Michelle Webb",
    "budget": 12637.95,
    "status": "working",
    "created": "08/24/2015",
    "modified": "09/15/2015"
  }, {
    "title": "Topicware",
    "division": "Administration",
    "project_owner": "Eugene Brown",
    "budget": 9667.52,
    "status": "working",
    "created": "08/01/2015",
    "modified": "09/29/2015"
  }, {
    "title": "Buzzster",
    "division": "Production",
    "project_owner": "Nicole Smith",
    "budget": 14657.54,
    "status": "working",
    "created": "08/09/2015",
    "modified": "09/18/2015"
  }, {
    "title": "Twinte",
    "division": "Administration",
    "project_owner": "Kevin Snyder",
    "budget": 17729.37,
    "status": "delivered",
    "created": "09/09/2015",
    "modified": "09/18/2015"
  }, {
    "title": "Blognation",
    "division": "Production",
    "project_owner": "Eugene Brown",
    "budget": 19540.82,
    "status": "archived",
    "created": "07/21/2015",
    "modified": "09/22/2015"
  }, {
    "title": "Flashdog",
    "division": "Production",
    "project_owner": "Michelle Webb",
    "budget": 24870.61,
    "status": "working",
    "created": "07/05/2015",
    "modified": "10/02/2015"
  }, {
    "title": "Yakijo",
    "division": "Accounting",
    "project_owner": "Killgore Trout",
    "budget": 23533.54,
    "status": "working",
    "created": "08/12/2015",
    "modified": "10/01/2015"
  }, {
    "title": "Quatz",
    "division": "Sales",
    "project_owner": "Richard Henry",
    "budget": 23639.65,
    "status": "archived",
    "created": "07/19/2015",
    "modified": "09/19/2015"
  }, {
    "title": "Dabjam",
    "division": "Marketing",
    "project_owner": "Kevin Snyder",
    "budget": 14356.55,
    "status": "new",
    "created": "08/22/2015",
    "modified": null
  }, {
    "title": "Meetz",
    "division": "Sales",
    "project_owner": "Kevin Snyder",
    "budget": 13882.22,
    "status": "delivered",
    "created": "08/26/2015",
    "modified": "10/01/2015"
  }, {
    "title": "Flipopia",
    "division": "Marketing",
    "project_owner": "Eugene Brown",
    "budget": 10306.87,
    "status": "delivered",
    "created": "08/11/2015",
    "modified": "09/17/2015"
  }, {
    "title": "Quaxo",
    "division": "Administration",
    "project_owner": "Nicole Smith",
    "budget": 13945.69,
    "status": "archived",
    "created": "07/13/2015",
    "modified": "09/21/2015"
  }, {
    "title": "Trunyx",
    "division": "Production",
    "project_owner": "Nicole Smith",
    "budget": 23136.21,
    "status": "delivered",
    "created": "09/03/2015",
    "modified": "09/19/2015"
  }, {
    "title": "Dabtype",
    "division": "Marketing",
    "project_owner": "Richard Henry",
    "budget": 22000.98,
    "status": "archived",
    "created": "08/26/2015",
    "modified": "09/28/2015"
  }, {
    "title": "Meetz",
    "division": "Marketing",
    "project_owner": "Eugene Brown",
    "budget": 17620.23,
    "status": "new",
    "created": "09/08/2015",
    "modified": null
  }, {
    "title": "Kimia",
    "division": "Sales",
    "project_owner": "Richard Henry",
    "budget": 12061.73,
    "status": "archived",
    "created": "08/31/2015",
    "modified": "09/29/2015"
  }, {
    "title": "Dazzlesphere",
    "division": "Accounting",
    "project_owner": "Eugene Brown",
    "budget": 21443.97,
    "status": "archived",
    "created": "07/20/2015",
    "modified": "10/01/2015"
  }];

  public filteredTable = this.filterTable({});

  public filter: Record<string, string | number> = {};

  public get totalBudget(): number {
    return this._tableData.reduce((prev, curr) => {
      const val = prev + (curr?.budget || 0);
      return val
    }, 0);
    // return reduced.toFixed(2);
  }

  public get totalStatus(): { name: string, count: number }[] {
    return this._tableData.reduce((prev, curr) => {
      const found = prev.find((elem) => elem.name === curr.status);
      if (found) found.count++;
      else prev.push({ name: curr.status, count: 1 });
      return prev;
    }, [] as { name: string, count: number }[])
  }

  constructor() { }

  public filterTable(event: any) {
    const filterKeys = Object.keys(event).filter((k) => !!event[k]);
    return this._tableData.filter((data: Record<string, any>) => {
      const shouldReturn = filterKeys.length ? filterKeys.some((k) => {
        const val = event[k];
        // if ()
        console.log('instanceof', val instanceof Date)
        if (val instanceof Date) return new Date(data[k]?.toString()).toISOString() === val.toISOString();
        return data[k]?.toString()?.toLowerCase()?.includes(val.toString()?.toLowerCase());
      }) : true;
      return shouldReturn
    })
  }

  public sortTable({ header, direction }: ITableSort) {
    const headerValue = header.value;
    if (direction === '') {
      this.filteredTable = [...this._tableData];
      return;
    }
    this.filteredTable = [...this._tableData].sort((a: any, b: any) => {
      let val = 0;
      const multiplier = direction === 'DESC' ? -1 : 1;
      if (a[headerValue] > b[headerValue]) val = 1;
      else if (b[headerValue] > a[headerValue]) val = -1;
      return val * multiplier;
    })
  }

  ngOnInit(): void {
  }

}
