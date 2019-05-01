import React, { useEffect, useState, useRef } from "react";
import useVisibility from "react-hooks/useVisibility.js";

export default function LazyLoad(props) {
  const nodeRef = useRef(null);
  const visible = useVisibility(nodeRef);
  const [state, setState] = useState(false);
  const { height, throttle = 200 } = props;

  useEffect(() => {
    let timer;
    switch (true) {
      case props.unmountIfInvisible:
        timer = setTimeout(() => setState(visible === "visible"), throttle);
        break;
      case visible === "visible":
        timer = setTimeout(() => setState(true), throttle);
        break;
    }
    return () => timer && clearTimeout(timer);
  }, [visible]);

  return (
    <div ref={nodeRef} style={{ minHeight: height, width: "100%" }}>
      {state ? props.children : null}
    </div>
  );
}
