import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { BackTop } from "antd";
import { Slider } from "antd";
import WebRTC from "./web-rtc.js";
import PicoDetect from "./pico-detect.js";
import _ from "lodash";

function FaceDetect() {
  const [score, setScore] = useState(100);
  const [video, setVideo] = useState();
  const onAfterChange = useCallback(val => {
    setImg([]);
    setScore(val);
  }, []);

  const oncanplay = useCallback(video => {
    setVideo(video);
  }, []);

  return (
    <React.Fragment>
      <Card style={{ marginBottom: 24 }}>
        Accuracy:
        <Slider
          defaultValue={score}
          max={500}
          min={50}
          marks={{ 500: "500", 50: "50" }}
          onAfterChange={onAfterChange}
          style={{ width: 200 }}
        />
        <div style={{ marginTop: 40 }}>
          <WebRTC oncanplay={oncanplay}></WebRTC>
          <PicoDetect video={video} score={score}></PicoDetect>
        </div>
      </Card>
      <BackTop />
    </React.Fragment>
  );
}

export default React.memo(FaceDetect);
