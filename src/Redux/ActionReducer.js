// import { act } from "react-dom/test-utils";
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  DELET_PRODUCT,
  CREATE_PRODUCT,
  GET_BY_ID,
  GET_UPDATE_ID,
} from "./ActionType";

const intialState = {
  productList: [],
  isLoading: false,
  deletSucccess: false,
  createSuccess: false,
  updateSuccess: false,
};

export const ActionReducer = (state = intialState, action) => {
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        isLoading: true,
        deletSucccess: false,
        createSuccess: false,
        updateSuccess: false,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productList: action.payload,
      };

    case REQUEST_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: true,
      };

    case DELET_PRODUCT:
      return {
        ...state,
        deletSucccess: true,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        isLoading: false,
        createSuccess: true,
      };

    case GET_BY_ID:
      return {
        ...state,
        isLoading: false,
        productDetails: action.payload,
      };

    case GET_UPDATE_ID:
      return {
        ...state,
        isLoading: false,
        updateSuccess: true,
      };

    default:
      return state;
  }
};
