import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import preload from "./preload";

const sider = (state = {}, action) => {
  switch (action.type) {
    case "SIDER_SWITCH":
      return { ...state, visible: !state.visible };
    case "SIDER_CLOSE":
      return { ...state, visible: false };
    default:
      return state;
  }
};
const accel0_Reducer = combineReducers({ sider });

const localSave = store => next => action => {
  const result = next(action);
  return result;
};

const QMiddleWare = compose(
  applyMiddleware(thunk),
  applyMiddleware(localSave),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);
export const store = createStore(accel0_Reducer, preload, QMiddleWare);
