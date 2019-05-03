import _ from "lodash";
import faker from "faker";
import moment from "moment";

const machine_list = [
  { name: "machine710", ip: "127.0.0.1" },
  { name: "machine720", ip: "127.0.0.2" },
  { name: "machine510", ip: "127.0.0.3" },
  { name: "machine310", ip: "127.0.0.4" }
];

const catalog = ["System", "Security", "Configuration"];
const level = ["Info", "Warning", "Error"];

const getDateRange = key => {
  const today = moment();
  let startDate = today.clone();
  let endDate = today.clone();
  let count;
  switch (key) {
    case "1m":
      startDate = startDate.subtract(1, "month");
      count = 1500;
      break;
    case "7d":
      startDate = startDate.subtract(7, "day");
      count = 500;
      break;
    case "24h":
      startDate = startDate.subtract(1, "day");
      count = 100;
      break;
  }
  return { startDate, endDate, count };
};

export default function fetchFake(url, params) {
  return new Promise(resolve => {
    switch (url) {
      case "/api/logs": {
        const { dateTag } = params;
        const { startDate, endDate, count = 100 } = getDateRange(dateTag);
        const data = _.times(count, () => {
          const machine = faker.random.arrayElement(machine_list);
          return {
            name: machine.name,
            ip: machine.ip,
            catalog: faker.random.arrayElement(catalog),
            content: faker.hacker.phrase(),
            level: faker.random.arrayElement(level),
            time: faker.date.between(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"))
          };
        });
        resolve(data);
        break;
      }
      case "/api/dashboard": {
        const data = _.times(50, () => {
          return {
            name: `Machine_` + faker.random.number()
          };
        });
        resolve(data);
        break;
      }
      case "/api/dashboard/state": {
        const ip = faker.internet.ip();
        let physical_total = _.random(512 * 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024);
        let physical_used = _.random(512 * 1024 * 1024 * 1024, 512 * 0.95 * 1024 * 1024 * 1024);
        const data = {
          physical_total: physical_total,
          physical_used: physical_used,
          healthy: faker.random.boolean(),
          ip: ip,
          ipv4: ip,
          ipv6: faker.internet.ipv6(),
          model: "P710"
        };
        resolve(data);
        break;
      }
      case "/api/monitor/disk": {
        const data = _.times(50, index => {
          return {
            bay: index + 1,
            capacity: _.random(512 * 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024),
            health: _.random(0, 99),
            model: "TOSHIBA DT01ACA100",
            serialnumber: "2015_" + faker.random.number()
          };
        });

        const power = [
          { key: "1.05V PCH", state: "ok", value: "1.041" },
          { key: "1.05V PCH", state: "ok", value: "1.218" },
          { key: "1.5V PCH", state: "ok", value: "1.500" },
          { key: "12V", state: "ok", value: "12.063" },
          { key: "3.3VCC", state: "ok", value: "3.316" },
          { key: "3.3VSB", state: "ok", value: "3.316" },
          { key: "5VCC", state: "ok", value: "5.026" },
          { key: "5VSB", state: "ok", value: "4.948" }
        ];

        const temperature = [
          { key: "P1-DIMMA1 Temp", state: "ok", value: "32.000" },
          { key: "P1-DIMMA2 Temp", state: "error", value: "50" },
          { key: "P1-DIMMB1 Temp", state: "error", value: "60.000" },
          { key: "P1-DIMMB2 Temp", state: "ok", value: "32.000" },
          { key: "P1-DIMMC1 Temp", state: "ok", value: "31.000" },
          { key: "P1-DIMMC2 Temp", state: "ok", value: "29.000" },
          { key: "P1-DIMMD1 Temp", state: "ok", value: "29.000" },
          { key: "P1-DIMMD2 Temp", state: "ok", value: "29.000" }
        ];

        const fan = [
          { key: "FAN1", state: "ok", value: "2700.000" },
          { key: "FAN2", state: "ok", value: "2700.000" },
          { key: "FAN3", state: "ok", value: "4000.000" },
          { key: "FAN4", state: "ok", value: "2700.000" },
          { key: "FAN5", state: "ok", value: "3800.000" },
          { key: "FAN5", state: "na", value: "na" },
          { key: "FANA", state: "na", value: "na" },
          { key: "FANB", state: "na", value: "na" }
        ];

        resolve({ disk_list: data, power, temperature, fan });
        break;
      }
      default:
        resolve([]);
        break;
    }
  });
}
