import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'tickets/:',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then((m) => m.HomePageModule),
      canActivate: [AuthGuard]  
  },
  {
    path: 'overview/:id',
    loadChildren: () =>
      import('./modules/ticket-overview/ticket-overview.module').then((m) => m.TicketOverviewModule),
      canActivate: [AuthGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
