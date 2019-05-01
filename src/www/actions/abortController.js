const AbortController = (requestPromise, timeout = 30000) => {
  let timeoutAction = null;
  let abortAction = null;
  let isTimeout = false;
  let isAbort = false;
  let isOk = false;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      isTimeout = true;
      reject("Request timed out!!");
    };
  });

  const abortPromise = new Promise((resolve, reject) => {
    abortAction = () => {
      isAbort = true;
      !isOk && reject("Ajax Abort");
    };
  });

  const timer = setTimeout(() => {
    timeoutAction();
  }, timeout);

  const requestPromise_extends = requestPromise.then(response => {
    clearTimeout(timer);
    isOk = true;
    return response;
  });

  const px = Promise.race([timerPromise, abortPromise, requestPromise_extends]);
  px.abort = abortAction;
  return px;
};
export default AbortController;
