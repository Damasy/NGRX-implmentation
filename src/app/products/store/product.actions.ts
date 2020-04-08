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

export type ProuctActions = ToggleProductCode
                          | SetCurrentProduct
                          | ClearCurrentProduct
                          | InitializaeCurrentProduct
                          | Load
                          | LoadSuccess
                          | LoadFail;
