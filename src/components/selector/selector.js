import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors/colors.js";
import splitDigits from "../../lib/helpers/splitDigits/splitDigits.js";

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

function shouldDisplay(ratio, {fromCurrencySign, toCurrencySign}) {
    return Boolean(ratio && fromCurrencySign && toCurrencySign);
}

function Selector({ratio, currencySigns}) {
    const [integerDigits, decimalFirstTwo, decimalLastTwo] = splitDigits(ratio);
    const {fromCurrencySign, toCurrencySign} = currencySigns;

    return shouldDisplay(ratio, currencySigns) ? (
        <Wrapper>
            <TextRate>
                <span>{`${fromCurrencySign}1`}</span>
                <span> = </span>
                <span>{`${toCurrencySign}${integerDigits}.${decimalFirstTwo}`}</span>
                <Decimals>{`${decimalLastTwo} `}</Decimals>
            </TextRate>
        </Wrapper>
    ) : null;
}

export default Selector;
