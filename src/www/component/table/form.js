import React, { useEffect, useMemo } from "react";
// import TagSelect from "../../../components/tag-select";
import _ from "lodash";
import { Input } from "antd";
import { Select, DatePicker } from "antd";
import { Row } from "antd";
import styles from "./form.cssm";
import useMerge from "react-hooks/useMerge.js";
const Search = Input.Search;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const today = moment();

export const formDefault = props => {
  let { severity, dateTag, dateRange, content } = props;
  switch (true) {
    case _.isArray(dateRange):
      dateRange = [moment(dateRange[0]), moment(dateRange[1])];
      break;
    default:
      let { startDate, endDate } = getDateRange("24h");
      dateRange = [startDate, endDate];
      break;
  }
  dateTag = _.defaultTo(dateTag, "24h");
  severity = _.isArray(severity) ? severity : [];
  return { dateRange, dateTag, severity, content };
};

const getDateRange = key => {
  let startDate = today.clone();
  let endDate = today.clone();
  switch (key) {
    case "1m":
      startDate = startDate.subtract(1, "month");
      break;
    case "7d":
      startDate = startDate.subtract(7, "day");
      break;
    case "3d":
      startDate = startDate.subtract(3, "day");
      break;
    case "24h":
      startDate = startDate.subtract(1, "day");
      break;
  }
  return { startDate, endDate };
};

Form.defaultProps = {
  onSubmit: () => {},
  onSaveOption: () => {}
};
function Form(props) {
  const [form, setForm] = useMerge(formDefault(props));
  const { dateRange, dateTag, severity, content } = form;
  const onChangeDate = React.useCallback(dateRange => setForm({ dateRange, dateTag: "--" }), []);
  const onTagChange = React.useCallback(severity => setForm({ severity }), []);
  const onDateRangeChange = React.useCallback(key => {
    const { startDate, endDate } = getDateRange(key);
    setForm({ dateRange: [startDate, endDate], dateTag: key });
  }, []);
  const onSearch = React.useCallback(content => setForm({ content }), []);

  useEffect(() => {
    props.onSubmit(form);
  }, [dateRange, dateTag, severity, content]);

  return (
    <React.Fragment>
      <Row className={styles.timer}>
        <h4 className={styles.label}>Time:</h4>
        <Select
          style={{ width: 100 }}
          className={styles.radio}
          placeholder="Select arrays"
          value={dateTag}
          onChange={onDateRangeChange}
        >
          <Option value="24h">24 hour</Option>
          <Option value="7d">7 days</Option>
          <Option value="1m">1 month</Option>
        </Select>
      </Row>
    </React.Fragment>
  );
}

export default React.memo(Form);
