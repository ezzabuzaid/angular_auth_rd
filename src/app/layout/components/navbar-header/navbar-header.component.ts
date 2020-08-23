import { Component, OnInit } from '@angular/core';
import { UsersService } from '@shared/services/users';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {
  $user = this.usersService.currentUser();
  constructor(
    private readonly sidebarService: SidebarManager,
    private readonly usersService: UsersService
  ) { }

  public get opened() {
    return this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).opened;
  }

  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

}
