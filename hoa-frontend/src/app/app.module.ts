import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProfileSettingsComponent } from './user/profile-settings/profile-settings.component';
import { TicketsComponent } from './homepage/tickets/tickets.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { CreateTicketDialogComponent } from './homepage/tickets/create-ticket-dialog/create-ticket-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './homepage/dashboard/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceComponent } from './homepage/invoice/invoice.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MarketComponent } from './homepage/market/market.component';
import { CreateProductDialogComponent } from './homepage/market/create-product-dialog/create-product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AuthComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ConfirmDialogComponent,
    ProfileSettingsComponent,
    TicketsComponent,
    HomeComponent,
    CreateTicketDialogComponent,
    DashboardComponent,
    InvoiceComponent,
    MarketComponent,
    CreateProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
