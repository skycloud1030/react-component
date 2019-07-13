import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../reducers/index.js";
import Main from "../component/layout/main.js";
import Route404 from "./route404.js";

export const Router_List = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/table" />} />
      <Route exact path="/table" component={Main} />
      <Route exact path="/dashboard" component={Main} />
      <Route exact path="/monitor" component={Main} />
      <Route exact path="/infinitetable" component={Main} />
      <Route exact path="/snapshot" component={Main} />
      <Route path="*" component={Route404} />
    </Switch>
  </ConnectedRouter>
);
export default Router_List;
