// Initializing prototype changes to inbuilt classes here
const safeRegex = require('safe-regex');

/**
 * error is thrown if given promise does not resolve before "timeout" ms
 * @param promise {Promise} promise to be timed
 * @param timeout {number} ms
 * @param errMsg {string} error message to be thrown if given promise times out
 * @returns {Promise<void>}
 */
Promise.__proto__.timeout = async (promise, timeout, errMsg = 'Promise timed out') => new Promise((resolve, reject) => {
  let timerId;
  const timerPromise = new Promise((res, rej) => {
    timerId = setTimeout(() => {
      reject(errMsg);
    }, timeout);
  });

  Promise.race([
    promise,
    timerPromise,
  ]).then(result => {
    clearTimeout(timerId);
    resolve(result);
  });
});

/**
 * timeout for multiple promises. If any of the promises exceed the time-limit, promise is rejected
 * @param promises {Promise[]}
 * @param timeout {number}
 * @param errorMessages {string}
 * @returns {Promise<void>}
 */
Promise.__proto__.allTimeout = async (promises, timeout, errorMessages = []) => {
  const connectionPromises = promises.map((promise, i) => Promise.timeout(promise, timeout, errorMessages[i]));
  return Promise.all(connectionPromises);
};

RegExp.__proto__.safe = (...args) => {
  if (safeRegex(...args)) return RegExp(...args);
  else throw new Error(`Unsafe RegExp ${args}`);
};