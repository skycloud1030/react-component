import React from "react";
import { Button } from "antd";
import styles from "./main.cssm";

function Header(props) {
  return (
    <header className={styles.header}>
      <Button shape="circle" icon="menu-fold" onClick={props.onSiderChange} className={styles.controlSider} />
    </header>
  );
}

export default React.memo(Header);
