import React from "react";
import { Menu } from "antd";
import { Drawer } from "antd";
import { Icon } from "antd";
import IconFont from "./icon";
import Media from "react-media";
import styles from "./main.cssm";

function Sider(props) {
  const { visible = false } = props;
  const _renderMenu = React.useMemo(() => {
    return (
      <Menu mode="inline" defaultSelectedKeys={["table"]} style={{ padding: "16px 0px" }}>
        <Menu.Item key="table">
          <Icon type="table" />
          Table
        </Menu.Item>
      </Menu>
    );
  }, []);
  return (
    <Media query="(min-width: 992px)">
      {matches =>
        matches ? (
          <aside className={styles.sider}>
            <div className={styles.logo}>
              <div>
                <IconFont type="icon-dingwei" className={styles.icon} />
                <h1>React</h1>
              </div>
            </div>
            {_renderMenu}
          </aside>
        ) : (
          <Drawer
            placement="left"
            closable={false}
            width={200}
            maskClosable={true}
            visible={visible}
            onClose={props.onSiderChange}
            className={styles.drawer}
          >
            {_renderMenu}
          </Drawer>
        )
      }
    </Media>
  );
}

export default React.memo(Sider);
