import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { TicketDTO, TicketStatus } from 'src/app/auth/dto/ticket.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tickets: TicketDTO[] | undefined;
  pendingTickets: TicketDTO[] | undefined;

  constructor(
    private userService: UserService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;

      // Check if this.tickets is defined before filtering
      if (this.tickets) {
        this.pendingTickets = this.tickets.filter(
          (ticket) => ticket.status === TicketStatus.PENDING
        );
      }
    });
  }
}
