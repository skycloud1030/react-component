import React, { useCallback, useState, useEffect, useMemo } from "react";
import Table, { Column, sortHeaderRenderer } from "Components/react-virtualized-table";
import RCList from "Components/react-virtualized-table/list.js";
import { List } from "immutable";
import { Badge } from "antd";
import { Card } from "antd";
import { BackTop } from "antd";
import { Avatar } from "antd";
import { Tag } from "antd";
import Media from "react-media";
import _ from "lodash";
import severity from "../../actions/severity.js";
import API from "../../actions/api.js";
import styles from "./index.cssm";

const { Meta } = Card;
const cellRenderer = {
  time: ({ cellData }) => moment(cellData).format("MM-DD HH:mm:ss"),
  catalog: ({ cellData }) => <span className={styles.capitalize}>{cellData}</span>,
  badge: ({ cellData }) => {
    const { data, status } = severity(cellData);
    return <Badge status={status} text={<span className={styles.capitalize}>{data}</span>} />;
  }
};

function TableCompoent() {
  const [data, setData] = useState(List([]));
  const [api] = useState(() => new API());
  const [sort, setSort] = useState({ sortBy: "time", sortDirection: "DESC" });
  const _sort = useCallback(({ sortBy, sortDirection }) => setSort({ sortBy, sortDirection }), []);

  useEffect(() => {
    let fet = api.RESTfulCall("/logs");
    fet.then(data => setData(List(data)));
    return () => fet && fet.abort();
  }, []);

  const sortData = useMemo(() => {
    const { sortDirection, sortBy } = sort;
    const direction = _.toLower(sortDirection) === "desc" ? -1 : 1;
    let value = data.sortBy(
      item => item[sortBy],
      (a, b) => {
        if (a < b) return -direction;
        if (a > b) return direction;
        if (a === b) return 0;
      }
    );
    return value;
  }, [data, sort.sortBy, sort.sortDirection]);

  const _rowRenderer = useCallback(
    index => {
      const data = sortData.get(index) || {};
      const { color } = severity(data.level);
      return (
        <Card bordered={false} className={styles.rowCard}>
          <Meta
            avatar={
              <Avatar size="large" style={{ backgroundColor: color }}>
                {data.level}
              </Avatar>
            }
            title={cellRenderer.time({ cellData: data.time })}
            description={data.name}
            style={{ marginBottom: 24 }}
          />
          <div style={{ marginBottom: 24 }}>
            <Tag color="blue">{data.catalog}</Tag>
          </div>
          <div className={styles.content}>
            <span title={data.content}>{data.content}</span>
          </div>
        </Card>
      );
    },
    [sortData]
  );

  const _renderList = useMemo(() => {
    return <RCList rowCount={sortData.size} rowRenderer={_rowRenderer} />;
  }, [sortData]);

  const _renderTable = useMemo(() => {
    return (
      <Table
        rowCount={sortData.size}
        rowGetter={({ index }) => sortData.get(index)}
        sort={_sort}
        sortBy={sort.sortBy}
        sortDirection={sort.sortDirection}
      >
        <Column
          label="Time"
          dataKey="time"
          width={180}
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
        <Column width={800} label="Content" dataKey="content" headerRenderer={sortHeaderRenderer} />
      </Table>
    );
  }, [sortData]);

  return (
    <Card className={styles.result} bordered={false}>
      <Media query="(min-width: 992px)">{matches => (matches ? _renderTable : _renderList)}</Media>
      <BackTop />
    </Card>
  );
}

export default React.memo(TableCompoent);
