import React from "react";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import store from "../../store/store.js";
import currencies from "../../lib/consts/currencies/currencies.js";
import Input from "../input/input.js";

import Carousel from "./carousel.js";

function createPocketsSpecification() {
    const wallets = get(store, "wallets", {});

    return map(wallets, (balance, currency) => ({
        currency,
        input: constant(<Input prefix={constant("-")} value={balance}/>),
        balance: walletBalance(currency)
    }));
}

function walletBalance(currency) {
    const balanceNumber = get(store, `wallets[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

function CarouselFactory() {
    const pockets = createPocketsSpecification();

    return <Carousel pockets={pockets} />;
}

export default CarouselFactory;
