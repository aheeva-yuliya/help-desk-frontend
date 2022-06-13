import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { TicketOverviewComponent } from './modules/ticket-overview/ticket-overview.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then((m) => m.HomePageModule),
      canActivate: [AuthGuard]  
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/error/error.module').then((m) => m.ErrorModule)
  },
  {
    path: 'overview/:id',
    component: TicketOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/:',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then((m) => m.HomePageModule),
      canActivate: [AuthGuard]  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
