import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { ProductDTO } from 'src/app/auth/dto/product.dto';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductDialogComponent {
  createProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {
    this.createProductForm = this.fb.group({
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      // Add other form controls as needed based on your CreateProductDTO
    });
  }

  onSubmit() {
    if (this.createProductForm.valid) {
      const productData = this.createProductForm.value;

      this.userService.createProduct(productData).subscribe(
        (response) => {
          this.userService.getProducts().subscribe((products: ProductDTO[]) => {
            this.sharedService.updateProducts(products);
          });
          this.createProductForm.reset();
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
