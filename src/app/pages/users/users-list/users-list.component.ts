import { Component, OnInit } from '@angular/core';
import { IApplicationUser } from '@core/application-user';
import { DataGrid, DisplayColumn } from '@partials/datagrid/column';
import { UsersService } from '@shared/services/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  dataGrid = new DataGrid<IApplicationUser>({
    provider: (query) => this.usersService.getUsers(query),
    columns: [
      new DisplayColumn({ key: 'username', }),
      new DisplayColumn({ key: 'email', }),
      new DisplayColumn({ key: 'mobile', }),
      new DisplayColumn({ key: 'verified', }),
    ]
  });

  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit() { }

}
