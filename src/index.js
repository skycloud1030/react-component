import React from "react";
import ReactDOM from "react-dom";
import Main from "./www/main.js";
import { Provider } from "react-redux";
import { store } from "./reducers/index.js";
import "antd/dist/antd.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("index")
);
