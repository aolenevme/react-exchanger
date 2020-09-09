import React from "react";
import constant from "lodash/constant.js";
import isNumber from "lodash/isNumber.js";

import Input from "../input/input.js";
import MUTATE_STORE from "../../events/mutate-store.js";
import {dispatch} from "../../lib/state-management/registry.js";

function CarouselInput({
    balance = 0, value = 0, prefixSymbol = "", isDisabled = false
}) {
    return <Input
        isDisabled={isDisabled}
        prefix={constant(<Prefix exchangeAmount={value} prefixSymbol={prefixSymbol}/>)}
        value={value}
        onInput={(inputEvent) => dispatch(MUTATE_STORE, () => defineEventPayload(balance, inputEvent, value))}
    />;
}

function Prefix({exchangeAmount, prefixSymbol}) {
    const valueNumber = Number(exchangeAmount);

    return isNumber(valueNumber) && valueNumber > 0
        ? prefixSymbol
        : "";
}

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity,max-statements
function defineEventPayload(balance, inputEvent, value) {
    const newValue = inputEvent.target.value;

    // eslint-disable-next-line no-negated-condition
    if (!window.chrome) {
        if (newValue === "") {
        // eslint-disable-next-line fp/no-mutation,no-param-reassign
            inputEvent.target.value = value;

            return [["exchangeAmount"], newValue];
        }

        if (((/^\d+\.\d{0,2}$/u).test(newValue) || (/^\d+$/u).test(newValue)) && Number(newValue) <= Number(balance)) {
            return [["exchangeAmount"], newValue];
        }
    } else {
        if ((/^\d+\.\d{1,2}$/u).test(value) && newValue === "") {
            // eslint-disable-next-line fp/no-mutation,no-param-reassign
            inputEvent.target.value = "";
        }

        // eslint-disable-next-line prefer-named-capture-group,security/detect-unsafe-regex,unicorn/no-unsafe-regex
        if ((newValue === "" || (/^\d+(\.\d{0,2})?$/u).test(newValue)) && Number(newValue) <= Number(balance)) {
            return [["exchangeAmount"], newValue];
        }
    }

    return [["exchangeAmount"], value];
}

export default CarouselInput;
