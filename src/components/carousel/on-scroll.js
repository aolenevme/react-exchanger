import {dispatch} from "../../lib/state-management/registry.js";
import MUTATE_STORE from "../../events/mutate-store.js";

function onScroll(atp, newActiveCurrency) {
    dispatch(MUTATE_STORE, () => [definedStoreMutationPath(atp), newActiveCurrency]);
    dispatch(MUTATE_STORE, () => [["exchangeAmount"], ""]);
}

function definedStoreMutationPath(atp) {
    return atp
        ? ["targetCurrency"]
        : ["selectedCurrency"];
}

export default onScroll;
