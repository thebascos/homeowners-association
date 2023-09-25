import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileSettingsComponent } from './user/profile-settings/profile-settings.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
