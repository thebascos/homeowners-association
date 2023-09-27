import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import { TicketDTO } from 'src/app/auth/dto/ticket.dto';
import { CreateTicketDialogComponent } from './create-ticket-dialog/create-ticket-dialog.component';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketDTO[] | undefined;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  openTicketCreationDialog() {
    const dialogRef = this.dialog.open(CreateTicketDialogComponent, {
      width: '400px', // Adjust the width as needed
    });
  }
}
