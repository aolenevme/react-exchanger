import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString";

import rateFormatter from "./rate-formatter.js";

function isSymbolValid(sign) {
    return isString(sign) && sign.length === 1;
}

function shouldFormat(rate, {selectedCurrencySymbol, targetCurrencySymbol}) {
    const isRateValid = isNumber(rate);

    const isSelectedCurrencySymbolValid = isSymbolValid(selectedCurrencySymbol);
    const isTargetCurrencySymbolValid = isSymbolValid(targetCurrencySymbol);

    return isRateValid && isSelectedCurrencySymbolValid && isTargetCurrencySymbolValid;
}

function rateString(rate, {selectedCurrencySymbol, targetCurrencySymbol}) {
    if (!shouldFormat(rate, {selectedCurrencySymbol, targetCurrencySymbol})) {
        return "";
    }

    const [integer, firstTwoFractions, lastTwoFractions] = rateFormatter(rate);

    return `${selectedCurrencySymbol}1 = ${targetCurrencySymbol}${integer}.${firstTwoFractions}${lastTwoFractions || ""}`;
}

export default rateString;
