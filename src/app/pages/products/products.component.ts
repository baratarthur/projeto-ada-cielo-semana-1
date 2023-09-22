import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from 'src/app/core/services/products.service';
import { FormsModule }   from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
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
  
  inputValue() {
    console.log('Valor do input:', this.itemName);
    this.productsService.searchValue = this.itemName;
    this.produtos$ = this.productsService.getProducts();
    this.productsService.page.value = 1;
  }

  myFunction(){
    if (document.body.style.backgroundColor = "white"){
      document.body.style.backgroundColor = "black";
    }
    this.productsService.page.value = 1;
  }
}
 