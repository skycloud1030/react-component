import React from "react";

function Loading({ error, pastDelay }) {
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading JS...</div>;
  } else {
    return null;
  }
}
export default React.memo(Loading);
