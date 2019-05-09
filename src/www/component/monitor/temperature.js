import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid } from "recharts";
import { XAxis, YAxis, Bar, Cell } from "recharts";
import { Spin, Card } from "antd";

function Temperature(props) {
  const { data = [] } = props;
  return (
    <Card>
      <Spin spinning={false}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
            maxBarSize={20}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" unit=" °C" />
            <YAxis dataKey="key" type="category" />
            <Bar dataKey="value" isAnimationActive={false}>
              {data.map((entry, index) => {
                let color;
                switch (entry.state) {
                  case "ok":
                    color = "#52c41a";
                    break;
                  case "error":
                    color = "#f5222d";
                    break;
                  default:
                    color = "#d9d9d9";
                    break;
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Spin>
    </Card>
  );
}

export default React.memo(Temperature);
