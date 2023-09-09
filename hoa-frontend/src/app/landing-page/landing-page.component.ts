import { Component } from '@angular/core';
import { HoService } from '../Services/ho.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(public signedIn: HoService) {}
}
