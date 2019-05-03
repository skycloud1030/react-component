import React, { useCallback } from "react";
import styles from "./disk-health.cssm";
import numeral from "numeral";
import { Tooltip } from "antd";
import _ from "lodash";

const { machine, machinecontainer } = styles;
const { flash, flashcontainer, flashContent } = styles;

DiskHealth.defaultProps = {
  data: []
};
function DiskHealth(props) {
  const { data } = props;
  const _diskStatus = useCallback(health => {
    let diskStatus;
    switch (true) {
      case health < 5:
        diskStatus = styles.critical;
        break;
      case health < 15:
        diskStatus = styles.degraded;
        break;
      case health < 0:
        diskStatus = styles.unknown;
        break;
      default:
        diskStatus = styles.healthy;
    }
    return diskStatus;
  }, []);

  const _renderTitle = useCallback(item => {
    let { health } = item;
    return (
      <React.Fragment>
        <div>{`${item.bay}`} </div>
        <div>{`${item.model}`} </div>
        <div>{`${item.serialnumber}`}</div>
        <div>{numeral(item.capacity).format("0.[00] b")}</div>
        <div>{health}%</div>
      </React.Fragment>
    );
  }, []);

  return (
    <div className={machine}>
      <div className={machinecontainer}>
        {data.map(item => {
          let disk_status = _diskStatus(item.health);
          item.capacity = _.toNumber(item.capacity);
          item.type = item.health < 0 ? "error" : "healthy";
          return (
            <div key={item.serialnumber} className={flash}>
              <Tooltip title={_renderTitle(item)} placement="bottom">
                <div className={`${flashcontainer}`}>
                  <div className={`${flashContent} ${disk_status}`}>
                    <div className={`${styles.header}`}>
                      <span className={styles.bay}>{item.bay}</span>
                    </div>
                    <div className={styles.body} />
                    <div className={styles.footer}>
                      <div className={`${styles.dot}`} />
                    </div>
                  </div>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiskHealth;
