import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ReclamationsListComponent } from './features/reclamations/reclamations-list/reclamations-list.component';
import { ReclamationDetailComponent } from './features/reclamations/reclamation-detail/reclamation-detail.component';
import { UsersListComponent } from './features/users/users-list/users-list.component';
import { OrdersListComponent } from './features/orders/orders-list/orders-list.component';
import { ReportsListComponent } from './features/reports/reports-list/reports-list.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reclamations', component: ReclamationsListComponent },
  { path: 'reclamations/:id', component: ReclamationDetailComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'reports', component: ReportsListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
