import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockDatabaseService } from './Services/MockDataService';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-up', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ],
  exports: [RouterModule],
  providers: [MockDatabaseService],
})
export class AppRoutingModule {}
