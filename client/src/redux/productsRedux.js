import { API_URL } from '../config';

//selectors
export const getAllProducts = (state) => state.products;

//actions
const createActionName = (actionName) => `app/products/${actionName}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

//action creators

export const loadProducts = (payload) => ({ payload, type: LOAD_PRODUCTS });

/* THUNKS */

export const loadProductsRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      console.log(data);
      dispatch(loadProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default productsReducer;
