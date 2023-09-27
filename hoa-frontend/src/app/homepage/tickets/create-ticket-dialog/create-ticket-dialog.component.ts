import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketCategory, TicketDTO } from 'src/app/auth/dto/ticket.dto';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.css'],
})
export class CreateTicketDialogComponent {
  ticketForm: FormGroup;
  ticketCategories?: TicketCategory;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: UserService,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<CreateTicketDialogComponent>
  ) {
    this.ticketForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      category: [TicketCategory.MAINTENANCE, [Validators.required]],
    });
  }

  submitTicket() {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;

      this.ticketService.createTicket(ticketData).subscribe(
        (response) => {
          this.ticketService.getTickets().subscribe((tickets: TicketDTO[]) => {
            this.sharedService.updateTickets(tickets);
          });
          this.ticketForm.reset();
          this.dialogRef.close();
        },
        (error) => {
          // Handle error response here
          console.error('Error creating ticket:', error);
        }
      );
    }
  }
}
