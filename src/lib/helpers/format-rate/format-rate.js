import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";
import split from "lodash/split.js";

function formatRate(rate, currencySymbols = {selectedCurrencySymbol: "", targetCurrencySymbol: ""}) {
    const {selectedCurrencySymbol, targetCurrencySymbol} = currencySymbols;
    const areArgumentsValid = shouldFormat(rate, currencySymbols);

    if (areArgumentsValid) {
        const fixedRate = rate.toFixed(4);

        const [integer, fractionNumber] = split(fixedRate, ".");
        const [firstTwoFractions, lastTwoFractions] = createArrayOfSubfractions(fractionNumber);

        return `${selectedCurrencySymbol}1 = ${targetCurrencySymbol}${integer}.${firstTwoFractions}${lastTwoFractions || ""}`;
    }

    return "";
}

function shouldFormat(rate, {selectedCurrencySymbol, targetCurrencySymbol}) {
    const isRateValid = isNumber(rate) && rate > 0;

    return isRateValid && isSymbolValid(selectedCurrencySymbol) && isSymbolValid(targetCurrencySymbol);
}

function isSymbolValid(sign) {
    return isString(sign) && sign.length === 1;
}

function createArrayOfSubfractions(fractionNumber) {
    if (isString(fractionNumber)) {
        const firstTwoFractions = fractionNumber.substring(0, 2);
        const lastTwoFractions = fractionNumber.substring(2, 4);
        const areLastTwoFractionsExtra = Boolean(Number(lastTwoFractions));

        return !areLastTwoFractionsExtra ?
            [firstTwoFractions] :
            [firstTwoFractions, lastTwoFractions];
    }

    return [];
}

export default formatRate;
