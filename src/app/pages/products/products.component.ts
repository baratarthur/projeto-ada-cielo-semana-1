import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule }   from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Product, ProductsService } from 'src/app/core/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdutcsFormDialogComponent } from '../../shared/produtcs-form-dialog/produtcs-form-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})
export class ProductsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription;
  productsService: ProductsService = inject(ProductsService);
  dialog: MatDialog = inject(MatDialog);
  
  itemCarrinho: number = 0;
  produtos: Product[] = [];
  produtosFiltrados: Product[] | undefined;
  itemName: string = '';
  foundItem: any = null;
  searchPerformed: boolean = false;

  ngOnInit(): void {
    this.subscriptions.add(
      this.productsService.getProducts().subscribe({
        next: (products) => {
          this.produtos = products;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.itemCarrinho)
  }

  moveNextPage() {
    this.productsService.goToNextPage();
    this.subscriptions.add(
      this.productsService.getProducts()
        .subscribe({next: this.setProducts.bind(this)})
    );
  }

  movePreviousPage() {
    this.productsService.goToPreviousPage();
    this.subscriptions.add(
      this.productsService.getProducts()
        .subscribe({next: this.setProducts.bind(this)})
    );
  }

  inputValue() {
    this.productsService.searchValue = this.itemName;
    this.productsService.page.value = 1;
    this.subscriptions.add(
      this.productsService.getProducts()
        .subscribe({next: this.setProducts.bind(this)})
    );
  }

  onKey(event:any) {
    const inputValue = event.target.value;
    this.productsService.searchValue = inputValue;
    this.subscriptions.add(
      this.productsService.getProducts()
        .subscribe({next: this.setProducts.bind(this)})
    );
  }

  private setProducts(products: Product[]): void {
    this.produtos = products;
    this.produtosFiltrados = this.productsService.filterProducts(products);
  }

  filterProducts(): void {
    this.produtosFiltrados = this.productsService.filterProducts(this.produtos);
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
      this.itemCarrinho =  Number(localStorage.getItem('itemCart'));
      console.log(this.itemCarrinho);
    });
  }

}
 