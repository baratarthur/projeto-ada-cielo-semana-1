import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product, ProductsService } from 'src/app/core/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdutcsFormDialogComponent } from '../../shared/produtcs-form-dialog/produtcs-form-dialog.component';
import {MatBadge, MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatIconModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  produtos$ = this.productsService.getProducts();
  itemCarrinho = localStorage.getItem('itemCart');

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    console.log(this.itemCarrinho)
  }

  moveNextPage() {
    this.productsService.goToNextPage();
    this.produtos$ = this.productsService.getProducts();
  }

  movePreviousPage() {
    this.productsService.goToPreviousPage();
    this.produtos$ = this.productsService.getProducts();
  }


  onKey(event:any) {
    const inputValue = event.target.value;
    this.productsService.searchValue = inputValue;
    this.produtos$ = this.productsService.getProducts();
    console.log(inputValue);
  }

  //Abre Modal
  openDialog(produto:Product): void {
    const dialogRef = this.dialog.open(ProdutcsFormDialogComponent, {
      width: '520px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.itemCarrinho =  localStorage.getItem('itemCart');
      console.log(this.itemCarrinho);
    });
  }
}
