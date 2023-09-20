import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})
export class ProductsComponent {
  produtos$ = this.productsService.getProducts();
  itemName: string = '';
  foundItem: any = null;
  searchPerformed: boolean = false;

  constructor(
    public productsService: ProductsService,
  ) {}

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
}
