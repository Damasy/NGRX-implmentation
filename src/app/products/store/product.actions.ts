import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  ToggleProductCode = '[product] Toggle product code',
  SetCurrentProduct = '[product] Set current product',
  ClearCurrentProduct = '[product] Clear current product',
  InitializaeCurrentProduct = '[product] Initializae current product',
  Load = '[product] Load',
  LoadSuccess = '[product] Load success',
  LoadFail = '[product] Load fail',
  UpdateProduct = '[product] Update Product',
  UpdateProductSuccess = '[product] Update Product success',
  UpdateProductFail = '[product] Update Product fail',
  DeleteProduct = '[product] Delete Product',
  DeleteProductSuccess = '[product] Delete Product success',
  DeleteProductFail = '[product] Delete Product fail',
  CreateProduct = '[product] Create Product',
  CreateProductSuccess = '[product] Create Product success',
  CreateProductFail = '[product] Create Product fail',
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializaeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializaeCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;
  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;
  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;
  constructor(public payload: string) {}
}

export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CreateProduct;
  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
  readonly type = ProductActionTypes.CreateProductSuccess;
  constructor(public payload: Product) {}
}

export class CreateProductFail implements Action {
  readonly type = ProductActionTypes.CreateProductFail;
  constructor(public payload: string) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;
  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DeleteProductSuccess;
  constructor(public payload: number) {}
}

export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DeleteProductFail;
  constructor(public payload: string) {}
}

export type ProuctActions = ToggleProductCode
                          | SetCurrentProduct
                          | ClearCurrentProduct
                          | InitializaeCurrentProduct
                          | Load
                          | LoadSuccess
                          | LoadFail
                          | UpdateProduct
                          | UpdateProductSuccess
                          | UpdateProductFail
                          | DeleteProduct
                          | DeleteProductSuccess
                          | DeleteProductFail
                          | CreateProduct
                          | CreateProductSuccess
                          | CreateProductFail;
