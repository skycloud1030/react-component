import _ from "lodash";
const severity = data => {
  let status;
  let color;
  switch (_.toLower(data)) {
    case "fatal":
    case "error":
      status = "error";
      data = "error";
      color = "#f5222d";
      break;
    case "warning":
      status = "warning";
      color = "#faad14";
      break;
    default:
      status = "default";
      break;
  }
  return { status, data, color };
};

export default severity;
