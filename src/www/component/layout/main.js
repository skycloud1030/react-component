import React, { useMemo } from "react";
import C_Sider from "../../container/layout/sider.js";
import C_Header from "../../container/layout/header.js";
import posed from "react-pose";
import styles from "./main.cssm";
import Loadable from "react-loadable";
import Exception from "Components/exception/index.js";
import Loading from "Components/loading";

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "react-dashboard" */ "../dashboard/index.js"),
  loading: Loading
});

const Table = Loadable({
  loader: () => import(/* webpackChunkName: "react-table" */ "../table/index.js"),
  loading: Loading
});

const Monitor = Loadable({
  loader: () => import(/* webpackChunkName: "react-monitor" */ "../monitor/index.js"),
  loading: Loading
});

const pathComponet = {
  "/dashboard": Dashboard,
  "/table": Table,
  "/monitor": Monitor
};

function Main(props) {
  const { match } = props;
  const { path = "" } = match;
  const _renderContent = useMemo(() => {
    const Components = pathComponet[path] || Exception;
    return <Components {...props} />;
  }, [path]);

  const Box = useMemo(() => {
    return posed.div({
      init: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 1000 } }
    });
  }, [path]);

  return (
    <section>
      <C_Sider />
      <section className={styles.content}>
        <C_Header />
        <main className={styles.main}>
          <Box pose="visible" initialPose="init">
            {_renderContent}
          </Box>
        </main>
        <footer />
      </section>
    </section>
  );
}

export default React.memo(Main);
