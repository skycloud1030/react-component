import React, { useEffect } from "react";
import { Progress } from "antd";
import _ from "lodash";
import fp from "lodash-fp";
import numeral from "numeral";
import styles from "./progress.cssm";
import useMerge from "react-hooks/useMerge.js";
import Media from "react-media";

const colors = {
  error: "#f5222d",
  warning: "#faad14",
  success: "#52c41a"
};

function CapacityProgress(props) {
  const [state, setState] = useMerge({ init: true, value: 0, color: colors.default, total: "" });

  useEffect(() => {
    const { capacity } = props;
    const { physical_total = 0, physical_used = 0 } = capacity;
    let per_val = fp.flow(
      item => _.divide(item, physical_total),
      item => _.round(item, 2),
      fp.multiply(100),
      fp.round
    )(physical_used);

    let progress_status;
    switch (true) {
      case per_val >= 90:
        progress_status = colors.error;
        break;
      case per_val >= 70:
        progress_status = colors.warning;
        break;
      case per_val >= 0:
        progress_status = colors.success;
        break;
      default:
        break;
    }
    setState({
      init: false,
      value: _.defaultTo(per_val, 0),
      text: _.defaultTo(per_val, "N/A"),
      color: progress_status,
      total: numeral(physical_total).format("0.[0] b")
    });
  }, [props.capacity]);

  return (
    <div className={styles.center}>
      {!state.init ? (
        <Media query="(max-width: 576px)">
          {matches => {
            return (
              <Progress
                type="circle"
                width={matches ? 120 : 160}
                strokeWidth={8}
                strokeColor={state.color}
                percent={state.value}
                format={() => (
                  <>
                    <div className={styles.title} style={{ color: state.color }}>{`${state.text} %`}</div>
                    <div className={styles.subTitle} style={{ color: state.color }}>{`${state.total}`}</div>
                  </>
                )}
              />
            );
          }}
        </Media>
      ) : null}
    </div>
  );
}

export default React.memo(CapacityProgress);
