import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import { TicketDTO } from 'src/app/auth/dto/ticket.dto';
import { CreateTicketDialogComponent } from './create-ticket-dialog/create-ticket-dialog.component';
import { SharedService } from 'src/app/Services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: TicketDTO[] | undefined;
  editTicketForm: FormGroup;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.editTicketForm = this.formBuilder.group({
      description: [''],
      status: [''],
      category: [''],
      resolution: [''],
    });
  }

  ngOnInit(): void {
    this.sharedService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  openTicketCreationDialog() {
    const dialogRef = this.dialog.open(CreateTicketDialogComponent, {
      width: '400px',
    });
  }

  toggleEditMode(ticket: TicketDTO): void {
    ticket.editing = !ticket.editing;

    if (!ticket.editing) {
      this.editTicketForm.patchValue({
        description: ticket.description,
        status: ticket.status,
        category: ticket.category,
        resolution: ticket.resolution,
      });
      this.updateTicket(ticket);
    }
  }

  updateTicket(ticket: TicketDTO): void {
    const updatedTicketData: TicketDTO = this.editTicketForm.value;

    if (
      (ticket.status === 'RESOLVED' && updatedTicketData.resolution! == null) ||
      ''
    ) {
      this.userService.updateTicket$(ticket.id, updatedTicketData).subscribe(
        (updatedTicket) => {
          if (this.tickets) {
            const index = this.tickets.findIndex((t) => t.id === ticket.id);
            if (index !== -1) {
              this.tickets[index] = updatedTicket;
            }
          }

          ticket.editing = false;
        },
        (error) => {
          console.error('Failed to update ticket:', error);
        }
      );
    }
  }
}
