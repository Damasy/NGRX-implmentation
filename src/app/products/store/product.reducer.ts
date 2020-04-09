import { ProuctActions, ProductActionTypes } from './product.actions';
import { Product } from './../product';
import * as fromRoot from './../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { stat } from 'fs';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const intitalState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

const intitalProduct = {
  id: 0,
  productName: '',
  productCode: 'new',
  description: '',
  starRating: 0
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) return intitalProduct;
    else return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
  }
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
        currentProductId: action.payload.id
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.InitializaeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
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
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(prod => {
        return action.payload.id === prod.id ? action.payload : prod;
      })
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.DeleteProductSuccess:
      const filteredProducts = state.products.filter(prod => prod.id != action.payload)
      return {
        ...state,
        products: filteredProducts,
        currentProductId: action.payload,
        error: ''
      };
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
