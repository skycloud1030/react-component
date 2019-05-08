import { combineReducers } from "redux";

function monitor(state = {}, action) {
  switch (action.type) {
    case "SET_DISK": {
      let { type, ...rest } = action;
      return { ...state, ...rest };
    }
    default:
      return state;
  }
}

function iops(state = {}, action) {
  switch (action.type) {
    case "SET_IOPS": {
      let { type, ...rest } = action;
      return { ...state, loading: false, ...rest };
    }
    default:
      return state;
  }
}

function bandwidth(state = {}, action) {
  switch (action.type) {
    case "SET_BANDWIDTH": {
      let { type, ...rest } = action;
      return { ...state, loading: false, ...rest };
    }
    default:
      return state;
  }
}

function latency(state = {}, action) {
  switch (action.type) {
    case "SET_LATENCY": {
      let { type, ...rest } = action;
      return { ...state, loading: false, ...rest };
    }
    default:
      return state;
  }
}

const reducer = combineReducers({
  monitor,
  iops,
  bandwidth,
  latency
});
export default reducer;
