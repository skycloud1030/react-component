import React, { useEffect, useState, useReducer, useMemo, useContext, useRef } from "react";
import { Tabs } from "antd";
import { Row, Col } from "antd";
import { Fan, Power, Temperature } from "./hardware.js";
import { Card } from "antd";
import numeral from "numeral";
import Context from "./context.js";
import reducer from "./reducer.js";
import initialState from "./preload.js";
import DiskHealth from "./disk-health";
import Chart from "./chart.js";
import AccelIcon from "../../icon";
import API from "../../actions/api.js";
import WebSocketFake from "../../actions/ws.js";
import styles from "./hardware.cssm";

const TabPane = Tabs.TabPane;

function C_Disk() {
  const { state } = useContext(Context);
  return useMemo(() => {
    return (
      <Card title="Disk">
        <DiskHealth data={state.monitor.healthy} />
      </Card>
    );
  }, [state.monitor.healthy]);
}

function C_Power() {
  const { state } = useContext(Context);
  return useMemo(() => {
    return <Power data={state.monitor.power} />;
  }, [state.monitor.power]);
}

function C_Temperature() {
  const { state } = useContext(Context);
  return useMemo(() => {
    return <Temperature data={state.monitor.temperature} />;
  }, [state.monitor.temperature]);
}

function C_Fan() {
  const { state } = useContext(Context);
  return useMemo(() => {
    return <Fan data={state.monitor.fan} />;
  }, [state.monitor.fan]);
}

function C_IOPS() {
  const { state } = useContext(Context);

  return useMemo(() => {
    const options = {
      grid: {
        top: "10%",
        left: "5%",
        right: "5%",
        containLabel: true
      },
      animation: false,
      xAxis: { type: "time", splitLine: { show: false } },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: val => `${numeral(val).format("0.[00] a")}`
        }
      }
    };
    return <Chart dataY={state.iops.dataY} options={options} loading={state.iops.loading} />;
  }, [state.iops.dataY]);
}

function C_BandWidth() {
  const { state } = useContext(Context);
  return useMemo(() => {
    const options = {
      grid: {
        top: "10%",
        left: "5%",
        right: "5%",
        containLabel: true
      },
      animation: false,
      xAxis: { type: "time", splitLine: { show: false } },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: val => `${numeral(val).format("0.[00] b")}`
        }
      }
    };
    return <Chart dataY={state.bandwidth.dataY} options={options} loading={state.bandwidth.loading} />;
  }, [state.bandwidth.dataY]);
}

function C_Latency() {
  const { state } = useContext(Context);
  return useMemo(() => {
    const options = {
      grid: {
        top: "10%",
        left: "5%",
        right: "5%",
        containLabel: true
      },
      animation: false,
      xAxis: { type: "time", splitLine: { show: false } },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: val => `${numeral(val / 1000).format("0.[00]")} ms`
        }
      }
    };
    return <Chart dataY={state.latency.dataY} options={options} loading={state.latency.loading} />;
  }, [state.latency.dataY]);
}

function Monitor() {
  const [api] = useState(() => new API());
  const [ws] = useState(() => new WebSocketFake());
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let fet = api.RESTfulCall("/monitor/disk");
    fet.then(data => {
      dispatch({ type: "SET_DISK", ...data });
    });
    return () => fet && fet.abort();
  }, []);

  useEffect(() => {
    let dataY = [];
    let iops = ws.addListener("iops", data => {
      dataY = [...dataY, [data.t, data.r, data.w]];
      dispatch({ type: "SET_IOPS", dataY });
    });
    return () => iops && iops.remove();
  }, []);

  useEffect(() => {
    let dataY = [];
    let bandwidth = ws.addListener("bandwidth", data => {
      dataY = [...dataY, [data.t, data.r, data.w]];
      dispatch({ type: "SET_BANDWIDTH", dataY });
    });
    return () => bandwidth && bandwidth.remove();
  }, []);

  useEffect(() => {
    let dataY = [];
    let latency = ws.addListener("latency", data => {
      dataY = [...dataY, [data.t, data.r, data.w]];
      dispatch({ type: "SET_LATENCY", dataY });
    });
    return () => latency && latency.remove();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Tabs defaultActiveKey="disk" className={styles.tabs} animated={false}>
        <TabPane tab={<AccelIcon type="icon-hdd" className={styles.icon} />} key="disk">
          <Row className={styles.row}>
            <Col xs={24}>
              <C_Disk />
            </Col>
          </Row>
          <Row gutter={16} className={styles.row}>
            <Col xs={24} xl={8}>
              <Card title="IOPS">
                <C_IOPS />
              </Card>
            </Col>
            <Col xs={24} xl={8}>
              <Card title="Latency">
                <C_Latency />
              </Card>
            </Col>
            <Col xs={24} xl={8}>
              <Card title="BandWidth">
                <C_BandWidth />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={<AccelIcon type="icon-power" className={styles.icon} />} key="power">
          <C_Power />
        </TabPane>
        <TabPane tab={<AccelIcon type="icon-temperature" className={styles.icon} />} key="temperature">
          <C_Temperature />
        </TabPane>
        <TabPane tab={<AccelIcon type="icon-fan" className={styles.icon} />} key="fan">
          <C_Fan />
        </TabPane>
      </Tabs>
    </Context.Provider>
  );
}

export default React.memo(Monitor);
