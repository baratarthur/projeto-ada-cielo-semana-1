import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const serviceMock = {
  getProducts: () => of([]),
  isFirstPage: true,
  goToNextPage: () => {},
  goToPreviousPage: () => {}
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        HttpClientModule
      ],
      providers: [
        {provide: ProductsService, useValue: serviceMock}
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call service to get products", () => {
    expect(component.produtos$).toBeDefined();
  })

  it("on click next it should increment page", () => {
    const spyNext = spyOn(serviceMock, "goToNextPage");
    const spyProdutos = spyOn(serviceMock, "getProducts");

    component.moveNextPage();

    expect(spyNext).toHaveBeenCalled();
    expect(spyProdutos).toHaveBeenCalled();
  })

  it("on click next it should decrement page", () => {
    const spyPrev = spyOn(serviceMock, "goToPreviousPage");
    const spyProdutos = spyOn(serviceMock, "getProducts");

    component.movePreviousPage();

    expect(spyPrev).toHaveBeenCalled();
    expect(spyProdutos).toHaveBeenCalled();
  })

  it("should disble prev button", () => {
    const buttonPrev: HTMLButtonElement = fixture.debugElement.query(By.css("#prev-button")).nativeElement;

    expect(buttonPrev).not.toBeNull();
    expect(buttonPrev.disabled).toBe(true);
  })

  it("should render no cards", () => {
    const cards: DebugElement[] = fixture.debugElement.queryAll(By.css(".card"));

    expect(cards).not.toBeNull();
    expect(cards).toHaveSize(0);
  })
});
