import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/main-layout/main-layout.module').then(
        m => m.MainLayoutModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login-layout/login-layout.module').then(
        m => m.LoginLayoutModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
