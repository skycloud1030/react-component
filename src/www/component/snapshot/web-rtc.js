import React, { useRef, useEffect } from "react";
import useMediaDevices from "react-hooks/useMediaDevices.js";
import styles from "./web-rtc.cssm";

function WebRTC(props, ref) {
  const video_ref = useRef();
  const video_ready = useMediaDevices(video_ref);

  useEffect(() => {
    if (video_ready) {
      const video = video_ref.current;
      props.oncanplay(video);
    }
  }, [video_ready]);

  return (
    <video autoPlay muted ref={video_ref} className={styles.video}></video>
  );
}

export default React.memo(React.forwardRef(WebRTC));
