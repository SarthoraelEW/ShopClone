import { GET_ALL_PRODUCTS } from "../actions/products.action";

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
}