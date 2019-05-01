import React, { useCallback, useState, useEffect, useMemo } from "react";
import Table, {
  Column,
  sortHeaderRenderer
} from "../../components/react-virtualized-table";
import { Badge } from "antd";
// import logs from "./index.json";
import _ from "lodash";
import severity from "../actions/severity.js";
import API from "../actions/api.js";
import styles from "./index.cssm";

const cellRenderer = {
  time: ({ cellData }) => moment(cellData).format("MM-DD HH:mm:ss"),
  catalog: ({ cellData }) => (
    <span className={styles.capitalize}>{cellData}</span>
  ),
  badge: ({ cellData }) => {
    const { data, status } = severity(cellData);
    return (
      <Badge
        status={status}
        text={<span className={styles.capitalize}>{data}</span>}
      />
    );
  }
};

function TableCompoent() {
  const [data, setData] = useState([]);
  const [api] = useState(() => new API());
  const [sort, setSort] = useState({ sortBy: "time", sortDirection: "DESC" });
  const _sort = useCallback(
    ({ sortBy, sortDirection }) => setSort({ sortBy, sortDirection }),
    []
  );

  useEffect(() => {
    api.RESTfulCall("/logs").then(data => setData(data));
    // setData(logs);
  }, []);

  const sortData = useMemo(() => {
    let { sortDirection, sortBy } = sort;
    return _.orderBy(data, [sortBy], [_.toLower(sortDirection)]);
  }, [data, sort.sortBy, sort.sortDirection]);

  return (
    <Table
      rowCount={sortData.length}
      rowGetter={({ index }) => sortData[index]}
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
      <Column
        width={200}
        label="Array"
        dataKey="name"
        headerRenderer={sortHeaderRenderer}
      />
      <Column
        width={200}
        label="IP"
        dataKey="ip"
        headerRenderer={sortHeaderRenderer}
      />
      <Column
        width={100}
        label="Catalog"
        dataKey="catalog"
        cellRenderer={cellRenderer.catalog}
        headerRenderer={sortHeaderRenderer}
      />
      <Column
        width={600}
        label="Content"
        dataKey="content"
        headerRenderer={sortHeaderRenderer}
      />
    </Table>
  );
}

export default React.memo(TableCompoent);
