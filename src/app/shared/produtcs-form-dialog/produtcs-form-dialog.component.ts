import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-produtcs-form-dialog',
  templateUrl: './produtcs-form-dialog.component.html',
  styleUrls: ['./produtcs-form-dialog.component.scss']
})
export class ProdutcsFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProdutcsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {}
    

  cancel(): void {
    this.dialogRef.close();
  }

}
