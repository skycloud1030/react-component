import { connect } from "react-redux";
import { push } from "connected-react-router";
import Sider from "../../component/layout/sider.js";

const mapStateToProps = state => {
  return {
    visible: state.sider.visible,
    location: state.router.location
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
    onSelect: ({ key }) => {
      dispatch(push(key));
      dispatch({ type: "SIDER_CLOSE" });
    }
  };
};

const C_Sider = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Sider);
export default C_Sider;
