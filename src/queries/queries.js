import get from "lodash/get.js";

import currencies from "../lib/consts/currencies/currencies.js";

function walletBalance(store, currency) {
    const balanceNumber = get(store, `wallets[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

// eslint-disable-next-line import/no-unused-modules
export default walletBalance;
