import React, { useState, useCallback } from "react";
import _ from "lodash";
import { InfiniteLoader, List as VList, AutoSizer, WindowScroller } from "react-virtualized";
import { Card } from "antd";
import { BackTop } from "antd";
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const _timeoutIdMap = {};
function Test() {
  const [loadedRowsMap, setRowsMaps] = useState({});
  const [minimumBatchSize] = useState(100);
  const [remoteRowCount, setRemote] = useState(100);

  const _isRowLoaded = useCallback(({ index }) => {
    return !!loadedRowsMap[index];
  }, []);
  const _loadMoreRows = useCallback(({ startIndex, stopIndex }) => {
    let promiseResolver;
    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }
    setRowsMaps(loadedRowsMap);
    const timeoutId = setTimeout(() => {
      delete _timeoutIdMap[timeoutId];
      setRemote(remoteRowCount => remoteRowCount + minimumBatchSize);
      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }
      setRowsMaps(loadedRowsMap);
      promiseResolver();
    }, 600);

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }, []);
  const _rowRenderer = useCallback(({ key, index, style }) => {
    let content;
    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = index;
    } else {
      content = <div className="ant-card-loading-block" style={{ width: "100%" }} />;
    }
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }, []);

  return (
    <Card>
      <InfiniteLoader
        minimumBatchSize={minimumBatchSize}
        isRowLoaded={_isRowLoaded}
        loadMoreRows={_loadMoreRows}
        rowCount={remoteRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, scrollTop, isScrolling, onChildScroll }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <VList
                    scrollTop={scrollTop}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    ref={registerChild}
                    autoHeight
                    height={height}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    rowCount={remoteRowCount}
                    rowHeight={24}
                    rowRenderer={_rowRenderer}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
      <BackTop />
    </Card>
  );
}

export default React.memo(Test);