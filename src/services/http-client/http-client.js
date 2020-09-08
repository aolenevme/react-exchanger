import isFunction from "lodash/isFunction.js";
import isObject from "lodash/isObject.js";
import isString from "lodash/isString.js";

function httpClient(requester, configuration = {}) {
    const {url, options} = configuration;

    areArgumentsValid(requester, url, options);

    return requester(url, options);
}

function areArgumentsValid(requester, url, options) {
    if (!isFunction(requester) || !isString(url) || !isObject(options)) {
        // eslint-disable-next-line fp/no-throw
        throw new Error("Invalid HTTP configuration");
    }
}

export default httpClient;
