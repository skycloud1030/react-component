import React, { useMemo, useEffect, useState } from "react";
import "Components/react-virtualized-table";
import { Spin } from "antd";
import C_Sider from "../../container/layout/sider.js";
import C_Header from "../../container/layout/header.js";
import posed from "react-pose";
import styles from "./main.cssm";
import Loadable from "react-loadable";
import Exception from "Components/exception/index.js";
import Loading from "Components/loading";

const Dashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "react-dashboard" */ "../dashboard/index.js"),
  loading: Loading
});

const Table = Loadable({
  loader: () =>
    import(/* webpackChunkName: "react-table" */ "../table/index.js"),
  loading: Loading
});

const Monitor = Loadable({
  loader: () =>
    import(/* webpackChunkName: "react-monitor" */ "../monitor/index.js"),
  loading: Loading
});

const Infinitetable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "react-infinitetable" */ "../infinite/index.js"
    ),
  loading: Loading
});

const Snapshot = Loadable({
  loader: () =>
    import(/* webpackChunkName: "react-snapshot" */ "../snapshot/index.js"),
  loading: Loading
});

const pathComponet = {
  "/dashboard": Dashboard,
  "/table": Table,
  "/monitor": Monitor,
  "/infinitetable": Infinitetable,
  "/snapshot": Snapshot
};

function Main(props) {
  const { match } = props;
  const { path = "" } = match;
  const [loading, setLoading] = useState(true);
  const _renderContent = useMemo(() => {
    const Components = pathComponet[path] || Exception;
    return <Components {...props} />;
  }, [path]);

  const Box = useMemo(() => {
    return posed.div({
      init: { opacity: 0.3 },
      visible: { opacity: 1, transition: { duration: 1000 } }
    });
  }, [path]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <section>
      <C_Sider />
      <Box pose="visible" initialPose="init">
        <section className={styles.content}>
          <C_Header />
          <main className={styles.main}>
            {!loading ? _renderContent : <Spin />}
          </main>
          <footer className={styles.footer} />
        </section>
      </Box>
    </section>
  );
}

export default React.memo(Main);
