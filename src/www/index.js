import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/index.js";
import Router from "./routes/index.routes.js";
import "antd/dist/antd.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("index")
);
