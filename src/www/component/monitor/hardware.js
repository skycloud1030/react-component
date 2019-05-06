import React from "react";
import { Badge } from "antd";
import { Card } from "antd";
import styles from "./hardware.cssm";
import _ from "lodash";

const TipInfo = React.memo(function TipInfo(props) {
  const { status, text, value } = props;
  return (
    <div className={styles.tipRow}>
      <div className={styles.text}>
        <Badge status={status} />
        {text}
      </div>
      <div>{value}</div>
    </div>
  );
});

const Fan = React.memo(function Fan(props) {
  const { data } = props;
  return (
    <Card title="Fan">
      {_.map(data, item => {
        let status;
        let text;
        switch (item.state) {
          case "ok":
            status = "success";
            text = `Normal`;
            break;
          default:
            status = "default";
            text = "N/A";
            break;
        }
        return <TipInfo status={status} text={item.key} value={text} />;
      })}
    </Card>
  );
});

const Power = React.memo(function Power(props) {
  const { data } = props;
  return (
    <Card title="Power">
      {_.map(data, item => {
        let status;
        switch (item.state) {
          case "ok":
            status = "success";
            break;
          default:
            status = "default";
            break;
        }
        return <TipInfo status={status} text={item.key} value={`${_.round(item.value, 2)} V`} />;
      })}
    </Card>
  );
});

const Temperature = React.memo(function Temperature(props) {
  const { data } = props;
  return (
    <Card title="Temperature">
      {_.map(data, item => {
        let status;
        switch (item.state) {
          case "ok":
            status = "success";
            break;
          case "error":
            status = "error";
            break;
          default:
            status = "default";
            break;
        }
        return <TipInfo status={status} text={item.key} value={`${_.round(item.value, 2)} °C`} />;
      })}
    </Card>
  );
});

export { Fan, Power, Temperature };
