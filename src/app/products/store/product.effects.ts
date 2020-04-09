import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productService: ProductService) {}

  // load all products data
  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) => this.productService.getProducts()
      .pipe(
        map((products: Product[]) => new productActions.LoadSuccess(products)),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  // update current product
  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    mergeMap((action: productActions.UpdateProduct) => this.productService.updateProduct(action.payload)
      .pipe(
        map((product: Product) => new productActions.UpdateProductSuccess(product)),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );
  
  // Create current product
  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map(newProduct => (new productActions.CreateProductSuccess(newProduct))),
        catchError(err => of(new productActions.CreateProductFail(err)))
      )
    )
  );

  // Delete current product
  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
        map(() => (new productActions.DeleteProductSuccess(productId))),
        catchError(err => of(new productActions.DeleteProductFail(err)))
      )
    )
  );
}
