import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import get from "lodash/get.js";
import map from "lodash/map.js";

import Carousel from "../carousel/carousel.js";
import Button from "../button/button.js";
import RateSelector from "../rate-selector/rate-selector.js";
import Input from "../input/input.js";
import colors from "../../lib/styles/colors/colors.js";
import rateFormatter from "../../lib/helpers/rate-formatter/rate-formatter.js";
import store from "../../store/store.js";
// eslint-disable-next-line import/max-dependencies
import currencies from "../../lib/consts/currencies/currencies.js";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    position: relative;

    padding-top: 1rem;

    width: 400px;

    border-radius: 8px;

    background-color: ${colors.primary};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0 1rem;

    height: 2rem;
`;

const Triangle = styled.div`
    position: relative;
    bottom: -10px;

    margin: auto;

    width: 0;
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${colors.primary};
`;

const BottomCarousel = styled(Carousel)`
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${colors.primaryDark};
`;

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

function formRateString(rate, rateCurrencies) {
    const [integer, firstTwoFractions, lastTwoFractions] = rateFormatter(rate);
    const {selectedCurrency, targetCurrency} = rateCurrencies;

    const selectedCurrencySymbol = get(currencies, `${selectedCurrency}.symbol`, "");
    const targetCurrencySymbol = get(currencies, `${targetCurrency}.symbol`, "");

    // eslint-disable-next-line max-len
    return `${selectedCurrencySymbol}1 = ${targetCurrencySymbol}${integer}.${firstTwoFractions}${lastTwoFractions || ""}`;
}

function App() {
    const getSelectedWalletsSpecification = constant({inputSign: "-", isDisabled: false, getRate: constant(null)});
    // eslint-disable-next-line max-len
    const getTargetWalletsSpecification = constant({inputSign: "+", isDisabled: true, getRate: (rate, currencySymbols) => formRateString(rate, currencySymbols)});

    return <Wrapper>
        <Header>
            <Button>Cancel</Button>
            <RateSelector rate={1.457} currencySymbols={{
                selectedCurrencySymbol: "£",
                targetCurrencySymbol: "$"
            }} />
            <Button>Exchange</Button>
        </Header>
        <Carousel pockets={createPockets(getSelectedWalletsSpecification)} />
        <Triangle />
        <BottomCarousel pockets={createPockets(getTargetWalletsSpecification)} />
    </Wrapper>;
}

export default App;
