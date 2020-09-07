import React from "react";
import constant from "lodash/constant.js";

import Input from "../input/input.js";
import {dispatch} from "../../lib/state-management/registry.js";
import MUTATE_STORE from "../../events/mutate-store.js";

function Prefix({exchangeAmount, inputSign}) {
    return exchangeAmount
        ? inputSign
        : null;
}

function CarouselInput({value = 0, inputSign = "", isDisabled = false}) {
    return <Input
        isDisabled={isDisabled}
        prefix={constant(<Prefix exchangeAmount={value} inputSign={inputSign}/>)}
        value={value}
        onInput={(inputEvent) => dispatch(MUTATE_STORE, () => [["exchangeAmount"], inputEvent.target.value])}
    />;
}

export default CarouselInput;
