import AbortController from "./abortController.js";
import fetchFake from "./fetch.js";
import _ from "lodash";

export default class API {
  constructor() {}
  postAPI = (url, params) => {
    const option = {
      method: "post",
      body: JSON.stringify(params)
    };
    return this.RESTfulCall(url, option);
  };
  getLogs = ({ dateTag, severity }) => {
    return this.RESTfulCall(`/logs`, { dateTag, severity });
  };
  getIOPS = () => {
    return this.RESTfulCall(`/iops`);
  };
  getInfiniteLogs = ({ endDate }) => {
    return this.RESTfulCall(`/infinite`, { endDate });
  };
  RESTfulCall = (url, options) => {
    const fet = AbortController(
      fetchFake(`/api${url}`, options)
        .then(res => (res.json ? res.json() : res))
        .then(data => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(data);
            }, 100);
          });
        })
        .catch(e => Promise.reject(e))
    );
    return fet;
  };
}
