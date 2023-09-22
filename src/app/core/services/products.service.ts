import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

type Category = string;
type Rating = number;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
 
  url: string = 'http://localhost:3000/products';
  page: Page = new Page();

  searchValue: string = '';
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  ratings: Rating[] = [0, 1, 2, 3, 4, 5];
  selectedRatings: Rating[] = [];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minPriceSelected: number = 0;
  maxPriceSelected: number = 10000;

  getProducts(): Observable<Product[]> {
    const params = new HttpParams()
      .set('pageSize', this.page.size)
      .set('search', this.searchValue)
      .set('pageNumber', this.page.value);

    this.resetFilters();

    return this.http.get<Product[]>(this.url, {params}).pipe(
      map(ps => this.mapCategories(ps)),
      map(ps => this.mapMinMaxPrices(ps))
    );
  }

  private resetFilters() {
    this.selectedCategories = [];
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

  mapCategories(products: Product[]): Product[] {
    const uniqueCategories = new Set(products.map(p => p.category));
    this.categories = Array.from(uniqueCategories.values());
  
    return products;
  }

  mapMinMaxPrices(products: Product[]): Product[] {
    this.minPrice = Math.min(...products.map(p => Number(p.price)));
    this.maxPrice = Math.max(...products.map(p => Number(p.price)));
    this.minPriceSelected = this.minPrice;
    this.maxPriceSelected = this.maxPrice;

    return products;
  }

  setSelectedCategories(cats: Category[]): void {
    this.selectedCategories = cats;
  }

  setSelectedRatings(rats: Rating[]): void {
    this.selectedRatings = rats;
  }

  filterProducts(products: Product[]): Product[] {
    return products
      .filter(this.byCategory.bind(this))
      .filter(this.byRating.bind(this))
      .filter(this.byPrice.bind(this));
  }

  private byCategory(product: Product): boolean {
    if(this.selectedCategories.length === 0) return true;
    return this.selectedCategories.includes(product.category);
  }
  
  private byRating(product: Product): boolean {
    if(this.selectedRatings.length === 0) return true;
    return this.selectedRatings.some(r => product.rating >= r && product.rating < r + 1);
  }

  private byPrice(products: Product): boolean {
    return Number(products.price) >= this.minPriceSelected &&
      Number(products.price) <= this.maxPriceSelected;
  }

  setMinMaxPrice(min: number | undefined, max: number | undefined): void {
    if(min) this.minPriceSelected = min;
    if(max) this.maxPriceSelected = max;
  }

}
