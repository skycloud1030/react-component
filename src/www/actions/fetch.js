import _ from "lodash";
import faker from "faker";

const machine_list = [
  { name: "machine710", ip: "127.0.0.1" },
  { name: "machine720", ip: "127.0.0.2" },
  { name: "machine510", ip: "127.0.0.3" },
  { name: "machine310", ip: "127.0.0.4" }
];

const catalog = ["System", "Security", "Configuration"];
const content = [
  "Start compression task for 0 volumes",
  "Apply changes; modules: iscsitarget",
  "Change iSCSI target settings of lab07-clone",
  "Start deduplication task for 0 volumes"
];
const level = ["Info", "Warning", "Error"];

export default function fetchFake(url) {
  return new Promise(resolve => {
    switch (url) {
      case "/api/logs": {
        const data = _.times(1000, () => {
          const machine = faker.random.arrayElement(machine_list);
          return {
            name: machine.name,
            ip: machine.ip,
            catalog: faker.random.arrayElement(catalog),
            content: faker.random.arrayElement(content),
            level: faker.random.arrayElement(level),
            time: faker.date.between("2019-04-20", "2019-04-28")
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
      default:
        resolve([]);
        break;
    }
  });
}
