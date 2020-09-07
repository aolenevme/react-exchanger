import React from "react";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import store from "../../store/store.js";
import Input from "../input/input.js";
import currencies from "../../lib/consts/currencies/currencies.js";

import Carousel from "./carousel.js";

function Prefix({exchangeAmount, inputSign}) {
    return exchangeAmount
        ? inputSign
        : null;
}

function createPockets(getSpecification = constant({inputSign: null, isDisabled: false, getRate: constant(null)})) {
    const {inputSign, isDisabled, getRate} = getSpecification();

    const wallets = get(store, "wallets", {});
    const toTargetCurrencyRate = get(store, "rates.toTargetCurrency", "");
    const exchangeAmount = get(store, "exchangeAmount", "");
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");

    return map(wallets, (balance, currency) => ({
        currency,
        // eslint-disable-next-line max-len
        input: constant(<Input isDisabled={isDisabled} prefix={constant(<Prefix exchangeAmount={exchangeAmount} inputSign={inputSign}/>)} value={exchangeAmount}/>),
        balance: walletBalance(currency),
        rate: getRate(toTargetCurrencyRate, {selectedCurrency, targetCurrency})
    }));
}

function walletBalance(currency) {
    const balanceNumber = get(store, `wallets[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

function CarouselFactory({className, specification}) {
    return <Carousel className={className} pockets={createPockets(specification)} />;
}

export default CarouselFactory;
