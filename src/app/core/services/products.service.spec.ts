import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

const productsMock = [
  {
      "id": "be001829-32ae-401b-bdfe-798e508410bc",
      "name": "Handcrafted Wooden Keyboard",
      "avatar": "https://picsum.photos/seed/FcRSmnCw/640/480",
      "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      "price": "45.00",
      "rating": 1.4,
      "category": "Tools"
  },
];

describe('ProductsService', () => {
  let service: ProductsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call products url", (done) => {
    service.getProducts().subscribe((products) => {
      expect(products).toHaveSize(1);
      done();
    });

    const params = new HttpParams()
      .set('pageSize', service.page.size)
      .set('pageNumber', service.page.value);

    const request = controller.expectOne(`${service.url}?${params.toString()}`);

    request.flush(productsMock);
  })

  it("should call products url with correct next page", (done) => {
    service.goToNextPage();

    service.getProducts().subscribe((products) => {
      expect(products).toHaveSize(1);
      done();
    });

    const params = new HttpParams()
      .set('pageSize', service.page.size)
      .set('pageNumber', 2);

    const request = controller.expectOne(`${service.url}?${params.toString()}`);

    request.flush(productsMock);
  })

  it("should call products url with correct previous page", (done) => {
    service.goToPreviousPage();

    service.getProducts().subscribe((products) => {
      expect(products).toHaveSize(1);
      done();
    });

    const params = new HttpParams()
      .set('pageSize', service.page.size)
      .set('pageNumber', 1);

    const request = controller.expectOne(`${service.url}?${params.toString()}`);

    request.flush(productsMock);
  })

  it("should call products url with correct navigation through pages", (done) => {
    service.goToNextPage();
    service.goToPreviousPage();

    service.getProducts().subscribe((products) => {
      expect(products).toHaveSize(1);
      done();
    });

    const params = new HttpParams()
      .set('pageSize', service.page.size)
      .set('pageNumber', 1);

    const request = controller.expectOne(`${service.url}?${params.toString()}`);

    request.flush(productsMock);
  })

  it("should start in the first page", () => {
    expect(service.isFirstPage).toBeTrue();
  })
});
