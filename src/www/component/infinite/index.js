import React, { useState, useCallback, useRef } from "react";
import _ from "lodash";
import { InfiniteLoader, AutoSizer, WindowScroller } from "react-virtualized";
import { Table } from "react-virtualized";
import { Column, sortHeaderRenderer,rowClassName } from "Components/react-virtualized-table";
import { cellRenderer } from "../table/index.js";
import { List } from "immutable";
import { Card } from "antd";
import { BackTop } from "antd";
import API from "../../actions/api.js";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;
let lastID;

const _timeoutIdMap = {};
function Test() {
  const [loadedRowsMap, setRowsMaps] = useState({});
  const [minimumBatchSize] = useState(100);
  const [data, setData] = useState(List([]));
  const [remoteRowCount, setRemote] = useState(100);
  const [api] = useState(() => new API());
  const lastRef = useRef();
  const _isRowLoaded = useCallback(({ index }) => !!loadedRowsMap[index], []);

  const _loadMoreRows = useCallback(({ startIndex, stopIndex }) => {
    let promiseResolver;
    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }
    setRowsMaps(loadedRowsMap);
    const timeoutId = setTimeout(() => {
      delete _timeoutIdMap[timeoutId];
      setRemote(remoteRowCount => remoteRowCount + minimumBatchSize);
      let fet = api.getInfiniteLogs({ endDate: moment(lastRef.current) });
      fet.then(data => {
        data = _.orderBy(data, ["time"], ["desc"]);
        lastRef.current = _.last(data)["time"];
        data = List(data);
        setData(state => state.concat(data));
        for (var i = startIndex; i <= stopIndex; i++) {
          loadedRowsMap[i] = STATUS_LOADED;
        }
        setRowsMaps(loadedRowsMap);
        promiseResolver();
      });
    }, 100 + Math.round(Math.random() * 500));

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }, []);
  const _rowRenderer = useCallback(({ key, index, style, columns, className }) => {
    let content;
    switch (true) {
      case loadedRowsMap[index] === STATUS_LOADED:
        content = columns;
        break;
      default:
        content = <div className="ant-card-loading-block" style={{ width: "100%" }} />;
        break;
    }
    return (
      <div key={key} style={style} className={className}>
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
                  <Table
                    ref={registerChild}
                    rowGetter={({ index }) => data.get(index) || {}}
                    autoHeight
                    rowClassName={rowClassName}
                    headerHeight={35}
                    width={width}
                    height={height}
                    rowHeight={30}
                    rowCount={remoteRowCount}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={_rowRenderer}
                  >
                    <Column
                      width={150}
                      label="Time"
                      dataKey="time"
                      cellRenderer={cellRenderer.time}
                      headerRenderer={sortHeaderRenderer}
                    />
                    <Column
                      width={100}
                      label="Severity"
                      dataKey="level"
                      cellRenderer={cellRenderer.badge}
                      headerRenderer={sortHeaderRenderer}
                    />
                    <Column width={200} label="Array" dataKey="name" headerRenderer={sortHeaderRenderer} />
                    <Column width={150} label="IP" dataKey="ip" headerRenderer={sortHeaderRenderer} />
                    <Column
                      width={100}
                      label="Catalog"
                      dataKey="catalog"
                      cellRenderer={cellRenderer.catalog}
                      headerRenderer={sortHeaderRenderer}
                    />
                    <Column
                      width={800}
                      label="Content"
                      dataKey="content"
                      headerRenderer={sortHeaderRenderer}
                    />
                  </Table>
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
