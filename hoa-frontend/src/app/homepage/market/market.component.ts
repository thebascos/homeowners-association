// market.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductDTO, ProductStatus } from 'src/app/auth/dto/product.dto';
import { UserService } from 'src/app/Services/user.service';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/Services/shared.service';
import { SignUpDTO } from 'src/app/auth/dto/signupdto';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  activeTab: string = 'productList';
  products?: ProductDTO[];
  showUserProducts: boolean = true;
  productStatusOptions: string[] = Object.values(ProductStatus);
  user?: SignUpDTO;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.sharedService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }

  activateTab(tabName: string): void {
    this.activeTab = tabName;
  }

  toggleUserProducts(): void {
    this.showUserProducts = !this.showUserProducts;
    this.loadProducts();
  }

  loadProducts(): void {
    this.userService
      .getProducts(this.showUserProducts)
      .subscribe((products) => {
        this.products = products;
      });
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: '400px',
    });
  }

  enableEditMode(product: ProductDTO): void {
    if (this.user?.houseCode === product.ho.houseCode) product.editing = true;
  }

  cancelEdit(product: ProductDTO): void {
    // Disable editing for the selected product
    product.editing = false;
  }

  updateProduct(product: ProductDTO): void {
    this.userService
      .updateProduct$(product.id, {
        description: product.description,
        price: product.price,
        status: product.status,
      })
      .subscribe(
        (updatedProduct) => {
          product.editing = false;
          this.loadProducts();
        },
        (error) => {
          console.error('Failed to update:', error);
        }
      );
  }
}
