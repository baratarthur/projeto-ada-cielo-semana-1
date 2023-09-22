import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutcsFormDialogComponent } from './produtcs-form-dialog.component';

describe('ProdutcsFormDialogComponent', () => {
  let component: ProdutcsFormDialogComponent;
  let fixture: ComponentFixture<ProdutcsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutcsFormDialogComponent]
    });
    fixture = TestBed.createComponent(ProdutcsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
