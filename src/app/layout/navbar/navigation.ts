import { Constants } from '@core/constants';
import { _extract } from '@shared/common';
export class NavigationItem {
  type?: 'item' | 'collapse';
  title: string;
  icon: string;
  routerLink?: string;
  children?: NavigationItem[];
  queryParams ?= null;
  constructor(item: NavigationItem) {
    this.type = item.type ?? 'item';
    this.title = item.title;
    this.icon = item.icon;
    this.routerLink = item.routerLink;
    this.children = item.children;
    this.queryParams = item.queryParams;
  }
}


export default [
  new NavigationItem({
    routerLink: `${ Constants.Routing.USERS.withSlash }`,
    icon: 'person',
    title: _extract('navbar_users'),
    type: 'item'
  }),
  new NavigationItem({
    routerLink: `${ Constants.Routing.SESSIONS.withSlash }`,
    icon: 'assistant',
    title: _extract('navbar_sessions'),
    type: 'item'
  }),
];
