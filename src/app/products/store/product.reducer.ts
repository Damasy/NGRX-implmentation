import { ProuctActions, ProductActionTypes } from './product.actions';
import { Product } from './../product';
import * as fromRoot from './../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const intitalState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export interface State extends fromRoot.State {
  products: ProductState;
}

export function reducer(state = intitalState, action: ProuctActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: {...action.payload}
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializaeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'new',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    default:
      return state;
  }
}
