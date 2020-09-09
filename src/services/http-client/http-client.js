import isFunction from "lodash/isFunction.js";
import isObject from "lodash/isObject.js";

function httpClient(requester, configuration = {}) {
    areArgumentsValid(requester, configuration);

    return requester(configuration);
}

function areArgumentsValid(requester, configuration) {
    if (!isFunction(requester) || !isObject(configuration)) {
        // eslint-disable-next-line fp/no-throw
        throw new Error("Invalid HTTP configuration");
    }
}

export default httpClient;
