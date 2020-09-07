import {observable} from "mobx";

import currencies from "../lib/consts/currencies/currencies.js";

export default observable({
    exchangeAmount: 12,
    rates: {
        target: 1.457,
        selected: 1.457
    },
    selectedCurrency: currencies.USD.abbreviation,
    targetCurrency: currencies.GBP.abbreviation,
    balances: {
        [currencies.USD.abbreviation]: 53.45,
        [currencies.EUR.abbreviation]: 100,
        [currencies.GBP.abbreviation]: 80.15
    }
});
