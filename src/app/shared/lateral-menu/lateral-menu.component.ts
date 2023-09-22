import { Component, EventEmitter, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription;
  form = this.formBuilder.group({
    minValue: [],
    maxValue: []
  });

  @ViewChild('cat') set categories(elRef: MatSelectionList) {
    elRef.registerOnChange((categoriesSelected) => {
      this.productsService.setSelectedCategories(categoriesSelected);
      this.onFilter.emit();
    })
  }

  @ViewChild('rat') set ratings(elRef: MatSelectionList) {
    elRef.registerOnChange((ratignsSelected) => {
      this.productsService.setSelectedRatings(ratignsSelected.sort());
      this.onFilter.emit();
    })
  }

  @Output() onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.get('minValue')?.valueChanges.subscribe({
        next: (value) => {
          this.productsService.setMinMaxPrice(value?? 0, undefined);
          this.onFilter.emit();
        }
      })
    );
    
    this.subscriptions.add(
      this.form.get('maxValue')?.valueChanges.subscribe({
        next: (value) => {
          this.productsService.setMinMaxPrice(undefined, value?? 0);
          this.onFilter.emit();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
