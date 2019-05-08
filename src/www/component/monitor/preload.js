const initialState = {
  monitor: {
    healthy: [],
    power: [],
    temperature: [],
    fan: []
  },
  iops: { dataY: [], loading: true },
  bandwidth: { dataY: [], loading: true },
  latency: { dataY: [], loading: true }
};

export default initialState;
