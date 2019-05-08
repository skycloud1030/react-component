import React, { useEffect, useRef } from "react";
import ReactEchart from "Components/react-echart";
import { Spin } from "antd";
import _ from "lodash";

Chart.defaultProps = {
  dataX: [],
  dataY: []
};
function Chart(props) {
  const { dataY, loading } = props;
  const canvas = useRef(null);
  const isReady = useRef(false);
  useEffect(() => {
    if (!_.isEmpty(dataY)) {
      if (isReady.current) {
        canvas.current.setOption({ series: [{ data: dataY, type: "line" }] });
      } else {
        let chartOptions = {
          ...props.options,
          series: [{ data: dataY, type: "line", showSymbol: false }]
        };
        canvas.current.setOption(chartOptions);
      }
      isReady.current = true;
    }
  }, [dataY]);
  return (
    <Spin spinning={loading}>
      <ReactEchart bodyStyle={{ height: 250 }} ref={canvas} />
    </Spin>
  );
}

export default React.memo(Chart);
