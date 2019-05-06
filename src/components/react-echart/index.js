import React from "react";
import echarts from "echarts";
import styles from "./index.cssm";
import _ from "lodash";
export { options } from "./options";

export default class ReactEchart extends React.PureComponent {
  static defaultProps = {
    noData: false
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = React.createRef();
  }
  resize = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = _.delay(() => this.echart && this.echart.resize(), 16);
  };
  componentDidMount() {
    if (this.canvas.current && !this.echart) {
      this.echart = echarts.init(this.canvas.current, "light");
      this.props.option && this.echart.setOption(this.props.option);
    }
    window.addEventListener("resize", this.resize);
  }
  componentDidUpdate(prevProps) {
    if (this.props.bodyStyle !== prevProps.bodyStyle) {
      this.resize();
    }
    if (this.props.noData != prevProps.noData) {
      this.resize();
    }
    if (prevProps.option !== this.props.option) {
      this.echart && this.echart.setOption(this.props.option);
    }
  }
  setOption = (options, noMerge) => {
    this.echart && this.echart.setOption(options, noMerge);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    this.timer && cancelAnimationFrame(this.timer);
  }
  render() {
    const { noData, bodyStyle } = this.props;
    return (
      <React.Fragment>
        <div className={styles.loadingMask} style={{ ...bodyStyle, display: !noData ? "none" : "block" }}>
          <div className={styles.loadingMaskShow}>
            <div className={styles.loadingMaskShowText}>No data</div>
          </div>
        </div>
        <div ref={this.canvas} style={{ ...bodyStyle, display: !noData ? "block" : "none" }} />
      </React.Fragment>
    );
  }
}
