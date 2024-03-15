import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import { ActionReducer } from "./ActionReducer";

const store = createStore(ActionReducer, applyMiddleware(thunk));
export default store;
