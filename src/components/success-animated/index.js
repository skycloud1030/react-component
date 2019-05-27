import React from "react";
import styles from "./index.cssm";

function Success(props) {
  const { className } = props;
  return (
    <div className={className}>
      <div className={styles.checkmark}>
        <div className={styles.icon}>
          <span className={`${styles.line} ${styles.tip}`} />
          <span className={`${styles.line} ${styles.long}`} />
          <div className={styles.circle} />
          <div className={styles.fix} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Success);
