import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from '@core/application-user';
import { Constants } from '@core/constants';
import { TokenHelper } from '@core/helpers/token';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public user = this.tokenService.decodedToken;
  routes = Constants.Routing;
  constructor(
    private readonly sidebarService: SidebarManager,
    private readonly tokenService: TokenHelper,
    private readonly applicationUser: ApplicationUser
  ) { }

  ngOnInit() { }

  toggleNavbar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

  toggleChatBar() {
    this.sidebarService.getSidebar(RegisterdSidebar.CHAT).toggle();
  }

  logout() {
    this.applicationUser.logout();
  }

}
