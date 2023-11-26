import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpDTO, Users } from 'src/app/auth/dto/signupdto';
import { GetInvoiceDTO, InvoiceDTO } from 'src/app/auth/dto/invoice.dto';
import { UserService } from 'src/app/Services/user.service';
import { SharedService } from 'src/app/Services/shared.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  stripe!: Stripe;
  invoiceForm: FormGroup;
  user?: SignUpDTO;
  users?: Users[];
  invoices?: GetInvoiceDTO[] | undefined;
  activeTab: string = 'invoiceList';

  @ViewChild('cardElement') cardElement!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.invoiceForm = this.formBuilder.group({
      hoId: [null, [Validators.required]],
      invoiceName: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Load Stripe with your Publishable Key
    loadStripe(
      'pk_test_51O8MpUKhul2DCYat03LTQjfjwG6y8bgmG6zWaO04usjwFkh2vF1qgtzjE1bLi27kbcINZwr6B19nlK8CEirVn3si00OipDTGbD'
    ).then((stripe) => {
      if (stripe) {
        this.stripe = stripe;
      }
    });

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

  payForInvoice(invoice: GetInvoiceDTO) {
    // Fetch the Checkout Session ID from your server
    this.userService.createCheckoutSession(invoice).subscribe((response) => {
      const sessionId = response.checkoutSessionId;

      if (sessionId) {
        // Redirect to the Stripe-hosted payment page
        this.stripe
          .redirectToCheckout({
            sessionId: sessionId,
          })
          .then((result) => {
            if (result.error) {
              console.error('Stripe Checkout failed:', result.error.message);
            } else {
              // The payment was successful; navigate to the success route
              this.router.navigate(['/home/bills']);
            }
          });
      } else {
        console.error('Checkout Session ID is not available.');
      }
    });
  }
}
