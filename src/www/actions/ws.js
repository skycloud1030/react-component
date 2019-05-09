import { EventEmitter } from "fbemitter";
import _ from "lodash";
// import faker from "faker";

class WebSocketFake {
  constructor() {
    this.emitter = new EventEmitter();
    setInterval(() => {
      let time = moment().unix();
      let r = _.random(1024 * 512, 1024 * 1024);
      let w = _.random(1024 * 512, 1024 * 1024);
      this.emitter.emit("iops", { t: time, r, w });

      this.emitter.emit("bandwidth", {
        t: time,
        r: r * 1024,
        w: w * 1024
      });

      this.emitter.emit("latency", {
        t: time,
        r: _.random(300, 800),
        w: _.random(300, 800)
      });
    }, 1000);

    return this.emitter;
  }
}

export default WebSocketFake;
