import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileSettingsComponent } from './user/profile-settings/profile-settings.component';
import { TicketsComponent } from './homepage/tickets/tickets.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './homepage/dashboard/dashboard/dashboard.component';
import { InvoiceComponent } from './homepage/invoice/invoice.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'home-page', component: HomepageComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      // Redirect the default route of 'home' to 'dashboard'
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'bills', component: InvoiceComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
