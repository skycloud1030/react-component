import React, { useState, useEffect, useMemo } from "react";
import { Card } from "antd";
import { Icon } from "antd";
import { Tag } from "antd";
import CapacityProgress from "./progress.js";
import API from "../../actions/api.js";
import styles from "./machine.cssm";

function Machine(props) {
  const [api] = useState(() => new API());
  const [loading, setLoading] = useState(true);
  const [array_capacity, setCapacity] = useState([]);
  const [title, setTitle] = useState({ healthy: "loading" });
  useEffect(() => {
    let fet = api.RESTfulCall("/dashboard/state");
    let timer;
    fet.then(data => {
      const { physical_total, physical_used, healthy } = data;
      const { ip } = data;
      timer = setTimeout(() => {
        setCapacity({ physical_total, physical_used });
        setLoading(false);
        setTitle({ healthy: healthy ? "success" : "error", ip });
      }, 800);
    });
    return () => {
      fet && fet.abort();
      timer && clearTimeout(timer);
    };
  }, []);

  const Title = useMemo(() => {
    let icon;
    const { healthy, ip } = title;
    switch (healthy) {
      case "success":
        icon = <Icon type="check-circle" theme="filled" className={styles.healthy} />;
        break;
      case "error":
        icon = <Icon type="close-circle" theme="filled" className={styles.error} />;
        break;
      default:
        icon = <Icon type="sync" spin className={styles.loading} />;
        break;
    }
    return (
      <React.Fragment>
        <div className={styles.title}>
          {icon} {props.name}
        </div>
        <div className={styles.title} style={{ marginTop: 8 }}>
          {ip ? <Tag color="volcano">{ip}</Tag> : null}
        </div>
      </React.Fragment>
    );
  }, [props.name, title]);

  return (
    <Card title={Title} loading={loading} bodyStyle={{ minHeight: 230 }}>
      <CapacityProgress capacity={array_capacity} />
    </Card>
  );
}

export default React.memo(Machine);
