import {observable} from "mobx";

import currencies from "../lib/consts/currencies/currencies.js";

export default observable({
    selectedCurrency: currencies.USD,
    targetCurrency: currencies.GBP,
    exchangeAmount: "",
    wallets: {
        [currencies.USD]: 53.45,
        [currencies.EUR]: 100,
        [currencies.GBP]: 80.15
    }
});
