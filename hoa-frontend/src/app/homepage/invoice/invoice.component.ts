import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpDTO, Users } from 'src/app/auth/dto/signupdto';
import { GetInvoiceDTO, InvoiceDTO } from 'src/app/auth/dto/invoice.dto';
import { UserService } from 'src/app/Services/user.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  user?: SignUpDTO;
  users?: Users[];
  invoices?: GetInvoiceDTO[] | undefined;
  activeTab: string = 'invoiceList';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.invoiceForm = this.formBuilder.group({
      hoId: [null, [Validators.required]],
      invoiceName: [null, [Validators.required, Validators.min(0)]],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Fetch the list of users when the component is initialized
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    this.sharedService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
    this.sharedService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }

  activateTab(tabName: string): void {
    this.activeTab = tabName;
  }

  submitInvoice() {
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.value as InvoiceDTO;

      this.userService.createInvoice(invoiceData).subscribe(
        (response) => {
          this.userService
            .getInvoices()
            .subscribe((invoices: GetInvoiceDTO[]) => {
              this.sharedService.updateInvoices(invoices);
            });
          this.invoiceForm.reset();
        },
        (error) => {
          // Handle error response here
          console.error('Error creating invoice:', error);
        }
      );
    }
  }
}
