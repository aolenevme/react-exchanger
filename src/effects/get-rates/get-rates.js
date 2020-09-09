import axios from "axios";
import get from "lodash/get.js";
import entries from "lodash/entries.js";

import MUTATE_STORE from "../../events/mutate-store.js";
import httpClient from "../../services/http-client/http-client.js";
import {dispatch} from "../../lib/state-management/registry.js";
import {regEventFx} from "../../lib/state-management/registry-fx.js";

const GET_RATES_FX = "GET_RATES_FX";

function preEffect(store, {base = "", symbol = ""}) {
    return {
        url: `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbol}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
}

async function effect(configuration) {
    try {
        const response = await httpClient(axios, {
            ...configuration
        });

        const OK_CODE = 200;

        if (response.status !== OK_CODE) {
            return [];
        }

        return getRateEntry(response.data);
    } catch {
        return [];
    }
}

function getRateEntry(responseData) {
    const rates = get(responseData, "rates", {USD: ""});
    const [rateEntry] = entries(rates);

    return rateEntry;
}

function postEffect(store, rateEntry) {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const [currency, rate] = rateEntry;

    const rateType = currency === selectedCurrency
        ? "target"
        : "selected";

    dispatch(MUTATE_STORE, () => [["rates", rateType], rate]);
}

regEventFx(GET_RATES_FX, preEffect, effect, postEffect);

export {preEffect, effect, postEffect};

export default GET_RATES_FX;
