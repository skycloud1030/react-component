import React, { useCallback, useState } from "react";
import { List } from "antd";
import { Row } from "antd";
import { Tag } from "antd";
import { Card } from "antd";
import { BackTop } from "antd";
import { Slider } from "antd";
import PicoDetect from "./pico-detect.js";
import LazyLoad from "Components/react-lazy-load";
import _ from "lodash";

function FaceDetect() {
  const [snaps, setImg] = useState([]);
  const [score, setScore] = useState(600);
  const onSnapshot = useCallback((image, score) => {
    setImg(images => [...images, { src: image, score }]);
  }, []);
  const onAfterChange = useCallback(val => {
    setImg([]);
    setScore(val);
  }, []);

  return (
    <React.Fragment>
      <Card style={{ marginBottom: 24 }}>
        Accuracy:
        <Slider
          defaultValue={600}
          max={1500}
          min={50}
          marks={{ 1000: "1000", 50: "50" }}
          onAfterChange={onAfterChange}
          style={{ width: 200 }}
        />
        <div style={{ marginTop: 40 }}>
          <PicoDetect onSnapshot={onSnapshot} score={score} />
        </div>
      </Card>
      <Card>
        <List grid={{ lg: 2, md: 1, xs: 1 }}>
          <Row gutter={16}>
            {_.map(snaps, (item, index) => (
              <List.Item key={index}>
                <LazyLoad height={480} throttle={200} unmountIfInvisible>
                  <div style={{ marginBottom: 8 }}>
                    <Tag color="red">{item.score}</Tag>
                  </div>
                  <div>
                    <img src={item.src} />
                  </div>
                </LazyLoad>
              </List.Item>
            ))}
          </Row>
        </List>
      </Card>
      <BackTop />
    </React.Fragment>
  );
}

export default FaceDetect;
