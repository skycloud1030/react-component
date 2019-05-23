import React from "react";
import { Table, AutoSizer, Column, WindowScroller } from "react-virtualized";
import { Icon } from "antd";
import "./styles.css";
import styles from "./index.cssm";

function rowClassName({ index }) {
  if (index < 0) {
    return styles.headerRow;
  } else {
    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  }
}

function sortHeaderRenderer({ dataKey, label, sortBy, sortDirection }) {
  let icon;
  switch (true) {
    case sortBy === dataKey && sortDirection === "DESC":
      icon = <Icon type="sort-descending" />;
      break;
    case sortBy === dataKey && sortDirection === "ASC":
      icon = <Icon type="sort-ascending" />;
      break;
  }
  return (
    <React.Fragment>
      {label}
      {icon}
    </React.Fragment>
  );
}

TableCompoent.defaultProps = {
  sortBy: "",
  sortDirection: "DESC",
  height: 300,
  rowHeight: 30,
  headerHeight: 35,
  headerClassName: "",
  windows: false,
  rowClassName: rowClassName,
  prefixCls: styles.headerColumn
};
function TableCompoent(props) {
  const { rowCount = 0, children = [] } = props;
  const { headerHeight, rowHeight } = props;

  if (!Array.isArray(children) && children.length === 0) {
    return null;
  }
  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              autoHeight
              width={width}
              height={height}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              rowClassName={rowClassName}
              rowCount={rowCount}
              rowGetter={props.rowGetter}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              sort={props.sort}
              sortBy={props.sortBy}
              sortDirection={props.sortDirection}
            >
              {children}
            </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

export { Column, sortHeaderRenderer, rowClassName };
export default React.memo(TableCompoent);
