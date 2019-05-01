import { connect } from "react-redux";
import Header from "../header.js";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSiderChange: () => {
      dispatch({ type: "SIDER_SWITCH" });
    }
  };
};

const C_Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export default C_Header;
