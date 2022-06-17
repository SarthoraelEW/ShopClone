import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllProducts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/product/get-all-products`)
      .then((res) => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  }
}