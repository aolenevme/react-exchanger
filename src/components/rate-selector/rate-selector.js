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

const LastRateTwoFractions = styled.span`
    font-size: 0.8rem;
`;

function isSignValid(sign) {
    return isString(sign) && sign.length === 1;
}

function shouldShow(formattedRate, {fromCurrencySign, toCurrencySign}) {
    const isRateValid = isArray(formattedRate) && formattedRate.length;

    const isFromCurrencySignValid = isSignValid(fromCurrencySign);
    const isToCurrencySignValid = isSignValid(toCurrencySign);

    return isRateValid && isFromCurrencySignValid && isToCurrencySignValid;
}

// eslint-disable-next-line no-shadow
function Text({formattedRate, currencySigns}) {
    const [integer, firstTwoFractions, lastTwoFractions] = formattedRate;
    const {fromCurrencySign, toCurrencySign} = currencySigns;

    const mainText = `${fromCurrencySign}1 = ${toCurrencySign}${integer}.${firstTwoFractions}`;

    return <TextRate>{mainText}<LastRateTwoFractions>{lastTwoFractions}</LastRateTwoFractions></TextRate>;
}

function RateSelector({rate, currencySigns}) {
    const formattedRate = rateFormatter(rate);

    return shouldShow(formattedRate, currencySigns) ? (
        <Wrapper>
            <Text formattedRate={formattedRate} currencySigns={currencySigns}/>
        </Wrapper>
    ) : null;
}

export default RateSelector;
