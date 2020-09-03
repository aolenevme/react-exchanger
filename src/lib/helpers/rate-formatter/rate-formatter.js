import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";
import split from "lodash/split.js";

function rateFormatter(rate) {
    const isRateValid = isValidRateNumber(rate);

    if (isRateValid) {
        const fixedRate = rate.toFixed(4);

        const [integer, fractionNumber] = split(fixedRate, ".");

        const subfractions = createArrayOfTwoSubfractions(fractionNumber);

        return [integer, ...subfractions]
    }

    return [];
}

function isValidRateNumber(rate) {
   return isNumber(rate) && rate > 0;
}

function createArrayOfTwoSubfractions(fractionNumber) {
    if (isString(fractionNumber)) {
        const firstTwoFractions = fractionNumber.substring(0, 2);
        const lastTwoFractions = fractionNumber.substring(2, 4);

        return [firstTwoFractions, lastTwoFractions];
    }

    return [];
}


export default rateFormatter;
