import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketDialogComponent } from './create-ticket-dialog.component';

describe('CreateTicketDialogComponent', () => {
  let component: CreateTicketDialogComponent;
  let fixture: ComponentFixture<CreateTicketDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTicketDialogComponent]
    });
    fixture = TestBed.createComponent(CreateTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
