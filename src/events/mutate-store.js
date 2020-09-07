import isArray from "lodash/isArray.js";
import isString from "lodash/isString.js";
import reduce from "lodash/reduce.js";

import {regEventStore} from "../lib/state-management/registry.js";

const MUTATE_STORE = "MUTATE_STORE";

function mutateStore(store, getMutateStoreSpecification) {
    const [path, value] = getMutateStoreSpecification();

    if (!pathIsValid(path)) {
        // eslint-disable-next-line fp/no-throw
        throw new Error("Incorrect path to mutate store");
    }

    return [path, value];
}

function pathIsValid(path) {
    const isPathArray = isArray(path);

    return isArrayConsistOfString(isPathArray, path);
}

function isArrayConsistOfString(isPathArray, path) {
    return (
        isPathArray
        && reduce(
            path,
            (accumulator, element) => accumulator && isString(element),
            true
        )
    );
}

regEventStore(MUTATE_STORE, mutateStore);

export {mutateStore};

// eslint-disable-next-line import/no-unused-modules
export default MUTATE_STORE;
