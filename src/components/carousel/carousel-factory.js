import React from "react";
import constant from "lodash/constant.js";

import Input from "../input/input.js";

import Carousel from "./carousel.js";

const fromPockets = [{
    currency: "USD",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$"
}, {
    currency: "EUR",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$"
}, {
    currency: "GBP",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$"
}];

function CarouselFactory() {
    return <Carousel pockets={fromPockets} />;
}

export default CarouselFactory;
