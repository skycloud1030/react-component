import React, { useEffect, useCallback, useRef } from "react";
import _ from "lodash";
import { Row } from "antd";
import { Select } from "antd";
import styles from "./form.cssm";
import useMerge from "react-hooks/useMerge.js";
import TagSelect, { Options as TagOptions } from "Components/react-tag-select";
const Option = Select.Option;
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
  const isMounted = useRef(false);
  const { dateTag, severity, content } = form;
  const onDateRangeChange = useCallback(key => setForm({ dateTag: key }), []);
  const onTagChange = useCallback(severity => setForm({ severity }), []);

  useEffect(() => {
    if (isMounted.current) {
      props.onSubmit(form);
    }
  }, [dateTag, severity, content]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

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
      <Row className={styles.timer}>
        <h4 className={styles.label}>Severity:</h4>
        <TagSelect onChange={onTagChange}>
          <TagOptions value="info">Info</TagOptions>
          <TagOptions value="warning">Warning</TagOptions>
          <TagOptions value="error">Error</TagOptions>
        </TagSelect>
      </Row>
    </React.Fragment>
  );
}

export default React.memo(Form);
