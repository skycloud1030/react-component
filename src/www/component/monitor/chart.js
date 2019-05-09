import React from "react";
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { AreaChart, Area } from "recharts";
import { Spin } from "antd";
import colors from "../../actions/color.js";
const format = {
  xFormat: val => moment(val, "X").format("HH:mm:ss")
};

function Chart(props) {
  const { dataY = [], loading, options = {} } = props;
  return (
    <Spin spinning={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={dataY} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="t" tickFormatter={format.xFormat} tickMargin={8} />
          <YAxis tickFormatter={options.yFormat} />
          <Area
            type="monotone"
            dataKey="r"
            stroke={colors[0]}
            fill={colors[0]}
            isAnimationActive={false}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="w"
            stroke={colors[1]}
            fill={colors[1]}
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default React.memo(Chart);
