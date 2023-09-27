import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileSettingsComponent } from './user/profile-settings/profile-settings.component';
import { TicketsComponent } from './homepage/tickets/tickets.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'home-page', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  {
    path: 'tickets',
    component: HomeComponent, // Use the layout component
    children: [
      {
        path: '',
        component: TicketsComponent, // This is where TicketsComponent will be displayed
      },
      // Add more child routes if needed
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
