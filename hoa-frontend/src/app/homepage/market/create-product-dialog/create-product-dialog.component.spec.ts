import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDialogComponent } from './create-product-dialog.component';

describe('CreateProductDialogComponent', () => {
  let component: CreateProductDialogComponent;
  let fixture: ComponentFixture<CreateProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductDialogComponent]
    });
    fixture = TestBed.createComponent(CreateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
