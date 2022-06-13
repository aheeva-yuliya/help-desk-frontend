import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TicketOverviewComponent } from './components/ticket-overview/ticket-overview.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'overview/:id',
    component: TicketOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/:',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my',
    loadChildren: () =>
      import('./modules/my/my.module').then((m) => m.MyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
