import { connect } from "react-redux";
import Sider from "../sider.js";

const mapStateToProps = state => {
  return {
    visible: state.sider.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onSiderChange: () => {
      dispatch({ type: "SIDER_SWITCH" });
    }
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...dispatchProps,
    onSelect: ({ key }) => {}
  };
};

const C_Sider = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Sider);
export default C_Sider;
