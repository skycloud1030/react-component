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

// function Hardware(props) {
//   const { disk_list = [], fan = [], power = [], temperature = [] } = props;
//   const fan_pop = useMemo(() => {
//     return (
//       <Card title="Fan">
//         {_.map(fan, item => {
//           let status;
//           let text;
//           switch (item.state) {
//             case "ok":
//               status = "success";
//               text = `Normal`;
//               break;
//             default:
//               status = "default";
//               text = "N/A";
//               break;
//           }
//           return <TipInfo status={status} text={item.key} value={text} />;
//         })}
//       </Card>
//     );
//   }, [fan]);

//   const power_pop = useMemo(() => {
//     return (
//       <Card title="Power">
//         {_.map(power, item => {
//           let status;
//           switch (item.state) {
//             case "ok":
//               status = "success";
//               break;
//             default:
//               status = "default";
//               break;
//           }
//           return <TipInfo status={status} text={item.key} value={`${_.round(item.value, 2)} V`} />;
//         })}
//       </Card>
//     );
//   }, [power]);

//   const temp_pop = useMemo(() => {
//     return (
//       <Card title="Temperature">
//         {_.map(temperature, item => {
//           let status;
//           switch (item.state) {
//             case "ok":
//               status = "success";
//               break;
//             case "error":
//               status = "error";
//               break;
//             default:
//               status = "default";
//               break;
//           }
//           return <TipInfo status={status} text={item.key} value={`${_.round(item.value, 2)} °C`} />;
//         })}
//       </Card>
//     );
//   }, [temperature]);

//   return (
//     <React.Fragment>
//       <Tabs defaultActiveKey="monitor" className={styles.tabs} animated={false}>
//         <TabPane tab={<Icon type="fund" className={styles.icon} />} key="monitor">
//           <Card>111</Card>
//         </TabPane>
//         <TabPane tab={<AccelIcon type="icon-hdd" className={styles.icon} />} key="disk">
//           <Card title="Disk">
//             <DiskHealth data={disk_list} />
//           </Card>
//         </TabPane>
//         <TabPane tab={<AccelIcon type="icon-power" className={styles.icon} />} key="power">
//           {power_pop}
//         </TabPane>
//         <TabPane tab={<AccelIcon type="icon-temperature" className={styles.icon} />} key="temperature">
//           {temp_pop}
//         </TabPane>
//         <TabPane tab={<AccelIcon type="icon-fan" className={styles.icon} />} key="fan">
//           {fan_pop}
//         </TabPane>
//       </Tabs>
//     </React.Fragment>
//   );
// }

// export default React.memo(Hardware);
