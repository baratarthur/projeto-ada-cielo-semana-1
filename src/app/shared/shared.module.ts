import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProdutcsFormDialogComponent } from './produtcs-form-dialog/produtcs-form-dialog.component';

@NgModule({
  declarations: [
    LateralMenuComponent,
    ProdutcsFormDialogComponent
  ],
  exports: [
    LateralMenuComponent,
    ProdutcsFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatSliderModule,
    MatButtonModule,
  ],
})
export class SharedModule { }
