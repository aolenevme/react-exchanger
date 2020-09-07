import React from "react";
import {observer} from "mobx-react-lite";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import store from "../../store/store.js";
import currencies from "../../lib/consts/currencies/currencies.js";

import CarouselInput from "./carousel-input.js";
import Carousel from "./carousel.js";

function walletBalance(currency) {
    const balanceNumber = get(store, `wallets[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

function createPockets(getSpecification = constant({inputSign: null, isDisabled: false, getRate: constant(null)})) {
    const {inputSign, isDisabled, getRate} = getSpecification();

    const exchangeAmount = get(store, "exchangeAmount", "");
    const targetRate = get(store, "rates.target", "");
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const wallets = get(store, "wallets", {});

    const selectedCurrencySymbol = get(currencies, `[${selectedCurrency}].symbol`, "");
    const targetCurrencySymbol = get(currencies, `[${targetCurrency}].symbol`, "");

    return map(wallets, (balance, currency) => ({
        currency,
        // eslint-disable-next-line max-len
        input: constant(<CarouselInput exchangeAmount={exchangeAmount} inputSign={inputSign} isDisabled={isDisabled} />),
        balance: walletBalance(currency),
        rate: getRate(targetRate, {selectedCurrencySymbol, targetCurrencySymbol})
    }));
}

function CarouselFactory({className, getSpecification}) {
    const pockets = createPockets(getSpecification);

    return <Carousel className={className} pockets={pockets} />;
}

export default observer(CarouselFactory);
