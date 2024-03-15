// import { stringify } from "uuid";

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  DELET_PRODUCT,
  CREATE_PRODUCT,
  GET_BY_ID,
  GET_UPDATE_ID,
} from "./ActionType";

import axios from "axios";

export const fetchData = () => {
  return {
    type: REQUEST_PENDING,
  };
};

export const fetchDataSuccess = (datas) => {
  return {
    type: REQUEST_SUCCESS,
    payload: datas,
  };
};

export const fetchDataError = () => {
  return {
    type: REQUEST_FAILURE,
  };
};

export const deleteItem = () => {
  return {
    type: DELET_PRODUCT,
  };
};

export const getById = (value) => {
  return {
    type: GET_BY_ID,
    payload: value,
  };
};

export const updateById = (value) => {
  return {
    type: GET_UPDATE_ID,
    payload: value,
  };
};

export const createItem = (newProduct) => {
  return {
    type: CREATE_PRODUCT,
    payload: newProduct,
  };
};

const baseUrl = `https://tosif-webjob.azurewebsites.net`;

export const getProduct = () => {
  return async (dispatch) => {
    dispatch(fetchData());
    try {
      const response = await axios.get(baseUrl + `/getproducts`);
      console.log(response);

      dispatch(fetchDataSuccess(response.data));
    } catch {
      dispatch(fetchDataError("internal error"));
    }
  };
};

export const deletProduct = (itemId) => {
  return async (dispatch) => {
    dispatch(fetchData());
    try {
      await axios.delete(baseUrl + `/api/MyProduct/deletbyid/${itemId}`);
      dispatch(deleteItem());
    } catch {
      dispatch(fetchDataError("internal error"));
    }
  };
};

export const createProduct = (value) => {
  console.log(value);
  return async (dispatch) => {
    dispatch(fetchData());
    try {
      const create = await axios.post(baseUrl + `/addproduct`, value);
      console.log(create);
      dispatch(createItem(create.data));
    } catch {
      dispatch(fetchDataError("internal error"));
    }
  };
};

export const getByProductId = (id) => {
  return async (dispatch) => {
    dispatch(fetchData());
    try {
      const response = await axios.get(
        baseUrl + `/api/MyProduct/getbyid/${id}`
      );
      console.log(response);

      dispatch(getById(response.data));
    } catch {
      dispatch(fetchDataError("internal error"));
    }
  };
};

export const updateByProductId = (value, id) => {
  return async (dispatch) => {
    dispatch(fetchData());
    try {
      const response = await axios.put(
        baseUrl + `/api/MyProduct/updatebyid/${id}`,
        value
      );

      dispatch(updateById(response.data));
    } catch {
      dispatch(fetchDataError("internal error"));
    }
  };
};
