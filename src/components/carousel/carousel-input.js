import React from "react";
import constant from "lodash/constant.js";
import isNumber from "lodash/isNumber.js";

import Input from "../input/input.js";
import {dispatch} from "../../lib/state-management/registry.js";
import MUTATE_STORE from "../../events/mutate-store.js";

function Prefix({exchangeAmount, prefixSymbol}) {
    const valueNumber = Number(exchangeAmount);

    return isNumber(valueNumber) && valueNumber > 0
        ? prefixSymbol
        : "";
}

function CarouselInput({value = 0, prefixSymbol = "", isDisabled = false}) {
    return <Input
        isDisabled={isDisabled}
        prefix={constant(<Prefix exchangeAmount={value} prefixSymbol={prefixSymbol}/>)}
        value={value}
        onInput={(inputEvent) => dispatch(MUTATE_STORE, () => [["exchangeAmount"], inputEvent.target.value])}
    />;
}

export default CarouselInput;
