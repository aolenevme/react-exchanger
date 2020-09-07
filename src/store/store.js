import {observable} from "mobx";

import currencies from "../lib/consts/currencies/currencies.js";

export default observable({
    selectedCurrency: currencies.USD.abbreviation,
    targetCurrency: currencies.GBP.abbreviation,
    exchangeAmount: "",
    rates: {
        toTargetCurrency: 1.457,
        toSelectedCurrency: 1.457
    },
    wallets: {
        [currencies.USD.abbreviation]: 53.45,
        [currencies.EUR.abbreviation]: 100,
        [currencies.GBP.abbreviation]: 80.15
    }
});
