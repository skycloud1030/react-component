import React, { useEffect, useState } from "react";
import { Tabs, Icon } from "antd";
import { Fan, Power, Temperature } from "./hardware.js";
import { Card } from "antd";
import DiskHealth from "./disk-health";
import AccelIcon from "../../icon";
import API from "../../actions/api.js";
import styles from "./hardware.cssm";
const TabPane = Tabs.TabPane;

function Monitor() {
  const [api] = useState(() => new API());
  const [disk, setDisk] = useState([]);
  const [power, setPower] = useState([]);
  const [temperature, setTemp] = useState([]);
  const [fan, setFan] = useState([]);
  useEffect(() => {
    let fet = api.RESTfulCall("/monitor/disk");
    fet.then(data => {
      setDisk(data.disk_list);
      setPower(data.power);
      setTemp(data.temperature);
      setFan(data.fan);
    });
    return () => fet && fet.abort();
  }, []);

  return (
    <Tabs defaultActiveKey="disk" className={styles.tabs} animated={false}>
      <TabPane tab={<AccelIcon type="icon-hdd" className={styles.icon} />} key="disk">
        <Card title="Disk">
          <DiskHealth data={disk} />
        </Card>
      </TabPane>
      <TabPane tab={<AccelIcon type="icon-power" className={styles.icon} />} key="power">
        <Power data={power} />
      </TabPane>
      <TabPane tab={<AccelIcon type="icon-temperature" className={styles.icon} />} key="temperature">
        <Temperature data={temperature} />
      </TabPane>
      <TabPane tab={<AccelIcon type="icon-fan" className={styles.icon} />} key="fan">
        <Fan data={fan} />
      </TabPane>
    </Tabs>
  );
}

export default React.memo(Monitor);
