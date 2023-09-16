import { Component } from '@angular/core';
import { HoService } from '../Services/ho.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(public signedIn: HoService) {}
}
