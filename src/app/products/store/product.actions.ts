import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  ToggleProductCode = '[product] Toggle product code',
  SetCurrentProduct = '[product] Set current product',
  ClearCurrentProduct = '[product] Clear current product',
  InitializaeCurrentProduct = '[product] Initializae current product'
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

export type ProuctActions = ToggleProductCode
                          | SetCurrentProduct
                          | ClearCurrentProduct
                          | InitializaeCurrentProduct;
