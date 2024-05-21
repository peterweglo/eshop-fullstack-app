// cartRedux.js

/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;
export const getTotalQuantity = ({ cart }) =>
  cart.products.reduce((sum, product) => sum + product.quantity, 0);

/* action name creator */
const reducerName = 'cart';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const CLEAR_CART = createActionName('CLEAR_CART');

/* action creators */
export const addProduct = (payload) => ({ payload, type: ADD_PRODUCT });
export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});
export const removeProduct = (id) => ({ type: REMOVE_PRODUCT, payload: id });
export const clearCart = () => ({ type: CLEAR_CART });

/* initial state */
const initialState = {
  products: JSON.parse(localStorage.getItem('cart')) || [],
};

/* reducer */
export default function reducer(state = initialState, action = {}) {
  let newProducts;

  switch (action.type) {
    case ADD_PRODUCT: {
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === action.payload.id,
      );

      if (existingProductIndex >= 0) {
        newProducts = state.products.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        newProducts = [...state.products, action.payload];
      }
      break;
    }
    case UPDATE_QUANTITY: {
      newProducts = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: action.payload.quantity }
          : product,
      );
      break;
    }
    case REMOVE_PRODUCT: {
      newProducts = state.products.filter(
        (product) => product.id !== action.payload,
      );
      break;
    }
    case CLEAR_CART: {
      newProducts = [];
      break;
    }
    default:
      return state;
  }

  try {
    localStorage.setItem('cart', JSON.stringify(newProducts));
  } catch (error) {
    console.error('error:', error);
  }

  return { ...state, products: newProducts };
}
