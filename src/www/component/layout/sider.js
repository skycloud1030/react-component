import React from "react";
import { Menu } from "antd";
import { Drawer } from "antd";
import { Icon } from "antd";
import IconFont from "../../icon";
import Media from "react-media";
import styles from "./main.cssm";
import posed from "react-pose";

const Box = posed.div({
  init: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1000 } }
});

function Sider(props) {
  const { visible = false } = props;
  const { location } = props;
  const { pathname } = location;

  const selectedKeys = React.useMemo(() => {
    switch (true) {
      default:
        return pathname;
    }
  }, [pathname]);

  const _renderMenu = React.useMemo(() => {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKeys]}
        onClick={props.onSelect}
        style={{ padding: "16px 0px" }}
      >
        <Menu.Item key="/table">
          <Icon type="table" />
          Table
        </Menu.Item>
        <Menu.Item key="/infinitetable">
          <Icon type="interation" />
          Infinite Table
        </Menu.Item>
        <Menu.Item key="/dashboard">
          <Icon type="dashboard" />
          Dasboard
        </Menu.Item>
        <Menu.Item key="/monitor">
          <Icon type="cloud" />
          Monitor
        </Menu.Item>
      </Menu>
    );
  }, [selectedKeys]);
  return (
    <Media query="(min-width: 992px)">
      {matches =>
        matches ? (
          <Box pose="visible" initialPose="init">
            <aside className={styles.sider}>
              <div className={styles.logo}>
                <div>
                  <IconFont type="icon-react" className={styles.icon} />
                  <h1>React</h1>
                </div>
              </div>
              {_renderMenu}
            </aside>
          </Box>
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
