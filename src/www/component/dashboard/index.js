import React, { useState, useEffect } from "react";
import { List } from "antd";
import { Row } from "antd";
import { BackTop } from "antd";
import Machine from "./machine.js";
import API from "../../actions/api.js";
import _ from "lodash";
import LazyLoad from "Components/react-lazy-load";

function Dashboard() {
  const [data, setData] = useState([]);
  const [api] = useState(() => new API());

  useEffect(() => {
    let fet = api.RESTfulCall("/dashboard");
    fet.then(data => setData(data));
    return () => fet && fet.abort();
  }, []);
  return (
    <React.Fragment>
      <List grid={{ xxl: 3, lg: 2, md: 1, xs: 1 }}>
        <Row gutter={16}>
          {_.map(data, (item, index) => (
            <List.Item key={index}>
              <LazyLoad height={340} throttle={200} unmountIfInvisible>
                <Machine {...item} />
              </LazyLoad>
            </List.Item>
          ))}
        </Row>
      </List>
      <BackTop />
    </React.Fragment>
  );
}

export default React.memo(Dashboard);
