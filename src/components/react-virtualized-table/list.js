import React, { useCallback } from "react";
import { List, WindowScroller, AutoSizer } from "react-virtualized";
import "./styles.css";
import styles from "./index.cssm";

function rowClassName({ index }) {
  if (index < 0) {
    return styles.headerRow;
  } else {
    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  }
}

RCList.defaultProps = {
  rowHeight: 250,
  rowCount: 0,
  rowClassName: rowClassName,
  rowRenderer: () => {}
};
function RCList(props) {
  const { rowCount, rowHeight } = props;
  const _rowRenderer = useCallback(({ key, index, style }) => {
    const className = rowClassName({ index });
    return (
      <div key={key} style={style} className={className}>
        <div className={styles.content}>{props.rowRenderer(index)}</div>
      </div>
    );
  });

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowRenderer={_rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

export default React.memo(RCList);
