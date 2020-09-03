import React from "react";
import styled from "styled-components";
import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";

import colors from "../../lib/styles/colors/colors.js";
import splitDigits from "../../lib/helpers/split-digits/split-digits.js";

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

const Decimals = styled.span`
    font-size: 0.8rem;
`;

function isSignValid(sign) {
    return isString(sign) && sign.length === 1;
}

function shouldDisplay(ratio, {fromCurrencySign, toCurrencySign}) {
    const isRatioNumberValid = isNumber(ratio);
    const isFromCurrencySignValid = isSignValid(fromCurrencySign);
    const isToCurrencySignValid = isSignValid(toCurrencySign);

    return isRatioNumberValid && isFromCurrencySignValid && isToCurrencySignValid;
}

function SelectorText({ratio, currencySigns}) {
    const [digits, firstTwoDecimals, lastTwoDecimals] = splitDigits(ratio);
    const {fromCurrencySign, toCurrencySign} = currencySigns;

    const mainText = `${fromCurrencySign}1 = ${toCurrencySign}${digits}.${firstTwoDecimals}`;

    return <TextRate>{mainText}<Decimals>{lastTwoDecimals}</Decimals></TextRate>;
}

function Selector({ratio, currencySigns}) {
    return shouldDisplay(ratio, currencySigns) ? (
        <Wrapper>
            <SelectorText ratio={ratio} currencySigns={currencySigns}/>
        </Wrapper>
    ) : null;
}

export default Selector;
