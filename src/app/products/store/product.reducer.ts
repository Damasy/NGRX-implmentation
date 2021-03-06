import { ProuctActions, ProductActionTypes } from './product.actions';
import { Product } from './../product';

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
