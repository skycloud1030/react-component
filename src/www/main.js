import React from "react";
import { Card } from "antd";
import Table from "./table/index.js";
import C_Sider from "./container/sider.js";
import C_Header from "./container/header.js";
import styles from "./main.cssm";

function Main() {
  return (
    <section>
      <C_Sider />
      <section className={styles.content}>
        <C_Header />
        <main className={styles.main}>
          <Card>
            <Table />
          </Card>
        </main>
        <footer />
      </section>
    </section>
  );
}

export default React.memo(Main);
