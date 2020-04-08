import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription, Observable } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
// NGRX
import { Store, select } from "@ngrx/store";
import * as fromProduct from './../store/product.reducer';
import * as productActions from './../store/product.actions';

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products: Product[];
  products$: Observable<Product[]>;
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => (this.selectedProduct = selectedProduct)
    // );

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => (this.products = products),
    //   error: (err: any) => (this.errorMessage = err.error)
    // });

    // TODO: unsbscripe
    this.sub = this.store
    .pipe(
      select(
        fromProduct.getShowProductCode
      )
    )
    .subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });
    this.sub = this.store
    .pipe(
      select(
        fromProduct.getCurrentProduct
      )
    )
    .subscribe(currentProduct => {
      this.selectedProduct = currentProduct;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializaeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.selectedProduct = product;
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
