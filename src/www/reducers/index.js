import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createHashHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import preload from "./preload";
export const history = createHashHistory();

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
const accel0_Reducer = combineReducers({
  router: connectRouter(history),
  sider
});

const QMiddleWare = compose(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);
export const store = createStore(accel0_Reducer, preload, QMiddleWare);
