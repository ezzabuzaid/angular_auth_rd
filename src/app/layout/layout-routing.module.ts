import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '@core/constants';
import { AppGuard } from '@core/guards';
import { ContainerComponent } from '@layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    children: [
      {
        path: Constants.Routing.USERS.withoutSlash,
        loadChildren: () => import('../pages/users/users.module').then(module => module.UsersModule)
      },
      {
        path: Constants.Routing.SESSIONS.withoutSlash,
        loadChildren: () => import('../pages/sessions/sessions.module').then(module => module.SessionsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
