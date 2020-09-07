import React from "react";
import styled from "styled-components";
import isArray from "lodash/isArray.js";
import isString from "lodash/isString.js";

import colors from "../../lib/styles/colors/colors.js";
import rateFormatter from "../../lib/helpers/rate-formatter/rate-formatter.js";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.2rem 0.5rem;

    min-height: 2rem;

    border: 1px solid ${colors.primaryLight};
    border-radius: 4px;

    background-color: ${colors.primaryDark};
    color: ${colors.textPrimary};

    font-weight: 400;

    cursor: pointer;

    transition: border-color 0.1s ease 0s;

    &:active {
        border-color: ${colors.secondary};
    }

    &:hover {
        border-color: ${colors.secondary};
    }
`;

const TextRate = styled.span`
    width: 100%;

    text-align: center;
`;

const LastTwoRateFractions = styled.span`
    font-size: 0.8rem;
`;

function isSignValid(sign) {
    return isString(sign) && sign.length === 1;
}

function shouldShow(formattedRate, {selectedCurrencySymbol, targetCurrencySymbol}) {
    const isRateValid = isArray(formattedRate) && formattedRate.length;

    const isSelectedCurrencySymbolValid = isSignValid(selectedCurrencySymbol);
    const isTargetCurrencySymbolValid = isSignValid(targetCurrencySymbol);

    return isRateValid && isSelectedCurrencySymbolValid && isTargetCurrencySymbolValid;
}

// eslint-disable-next-line no-shadow
function Text({formattedRate, currencySymbols}) {
    const [integer, firstTwoFractions, lastTwoFractions] = formattedRate;
    const {selectedCurrencySymbol, targetCurrencySymbol} = currencySymbols;

    const mainText = `${selectedCurrencySymbol}1 = ${targetCurrencySymbol}${integer}.${firstTwoFractions}`;

    return <TextRate>{mainText}<LastTwoRateFractions>{lastTwoFractions || ""}</LastTwoRateFractions></TextRate>;
}

function RateSelector({rate, currencySymbols}) {
    const formattedRate = rateFormatter(rate);

    return shouldShow(formattedRate, currencySymbols) ? (
        <Wrapper>
            <Text formattedRate={formattedRate} currencySymbols={currencySymbols}/>
        </Wrapper>
    ) : null;
}

export default RateSelector;
