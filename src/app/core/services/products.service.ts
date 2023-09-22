import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

export interface Product {
  id: string
  name: string
  avatar: string
  description: string
  price: string
  rating: number
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  url: string = 'http://localhost:3000/products';
  page: Page = new Page();
  searchValue: string = '';

  getProducts(): Observable<Product[]> {
    const params = new HttpParams()
      .set('pageSize', this.page.size)
      .set('search', this.searchValue)
      .set('pageNumber', this.page.value);
      
    return this.http.get<Product[]>(this.url, {params});
  }

  get isFirstPage(): boolean {
    return this.page.value === 1;
  }

  goToNextPage(): void {
    this.page.value++;
  }

  goToPreviousPage(): void {
    if(this.page.value > 1) {
      this.page.value--;
    }
  }
  
}
