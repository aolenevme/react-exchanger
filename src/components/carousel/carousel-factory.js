import React from "react";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import store from "../../store/store.js";
import currencies from "../../lib/consts/currencies/currencies.js";
import Input from "../input/input.js";

import Carousel from "./carousel.js";

function Prefix({exchangeAmount, inputSign}) {
    return exchangeAmount
        ? inputSign
        : null;
}

function walletBalance(currency) {
    const balanceNumber = get(store, `wallets[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

function createPockets(getSpecification = constant({inputSign: null, isDisabled: false, getRate: constant(null)})) {
    const {inputSign, isDisabled, getRate} = getSpecification();

    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const exchangeAmount = get(store, "exchangeAmount", "");
    const targetRate = get(store, "rates.target", "");
    const wallets = get(store, "wallets", {});

    return map(wallets, (balance, currency) => ({
        currency,
        // eslint-disable-next-line max-len
        input: constant(<Input isDisabled={isDisabled} prefix={constant(<Prefix exchangeAmount={exchangeAmount} inputSign={inputSign}/>)} value={exchangeAmount}/>),
        balance: walletBalance(currency),
        // eslint-disable-next-line max-len
        rate: getRate(targetRate, {selectedCurrencySymbol: currencies[selectedCurrency].symbol, targetCurrencySymbol: currencies[targetCurrency].symbol})
    }));
}

function CarouselFactory({className, getSpecification}) {
    return <Carousel className={className} pockets={createPockets(getSpecification)} />;
}

export default CarouselFactory;
