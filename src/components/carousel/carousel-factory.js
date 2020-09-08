import React from "react";
import {observer} from "mobx-react-lite";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import store from "../../store/store.js";
import currencies from "../../lib/consts/currencies/currencies.js";
import formatRate from "../../lib/helpers/format-rate/format-rate.js";

import onScroll from "./on-scroll.js";
import CarouselInput from "./carousel-input.js";
// eslint-disable-next-line import/max-dependencies
import Carousel from "./carousel.js";

function getActiveCurrency(atp) {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");

    return atp
        ? targetCurrency
        : selectedCurrency;
}

function createPockets(atp = false) {
    const balances = get(store, "balances", {});
    const inputValue = calculateInputValue(atp);
    const prefixSymbol = getInputPrefix(atp);

    return map(balances, (balance, currency) => ({
        currency,
        input: constant(<CarouselInput
            balance={balance}
            value={inputValue}
            prefixSymbol={prefixSymbol}
            isDisabled={isInputDisabled(atp)} />),
        balanceText: pocketBalance(currency),
        rate: calculateRate(atp)
    }));
}

function calculateInputValue(atp) {
    const exchangeAmount = get(store, "exchangeAmount", "");

    return atp
        ? getTargetInputValue(exchangeAmount)
        : exchangeAmount;
}

function getTargetInputValue(exchangeAmount) {
    const targetRate = get(store, "rates.target", "");
    const targetInputValue = Number(exchangeAmount) * Number(targetRate);
    const PRECISION = 3;

    return exchangeAmount === ""
        ? exchangeAmount
        : targetInputValue.toPrecision(PRECISION);
}

function getInputPrefix(atp) {
    return atp
        ? "+"
        : "-";
}

function isInputDisabled(atp) {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");

    const areCurrenciesEqual = selectedCurrency === targetCurrency;

    return atp || (!atp && areCurrenciesEqual);
}

function pocketBalance(currency) {
    const balanceNumber = get(store, `balances[${currency}]`, "");
    const currencySymbol = get(currencies, `${currency}.symbol`, "");

    return `You have ${currencySymbol}${balanceNumber}`;
}

function calculateRate(atp) {
    const targetRate = get(store, "rates.target", "");
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const selectedCurrencySymbol = get(currencies, `[${selectedCurrency}].symbol`, "");
    const targetCurrencySymbol = get(currencies, `[${targetCurrency}].symbol`, "");

    return atp && selectedCurrency !== targetCurrency
        ? formatRate(targetRate, {selectedCurrencySymbol, targetCurrencySymbol})
        : null;
}

function CarouselFactory({className, areTargetPockets = false}) {
    const activeCurrency = getActiveCurrency(areTargetPockets);
    const pockets = createPockets(areTargetPockets);

    return <Carousel
        className={className}
        activeCurrency={activeCurrency}
        pockets={pockets}
        onScroll={(newActiveCurrency) => onScroll(areTargetPockets, newActiveCurrency)}/>;
}

export default observer(CarouselFactory);
