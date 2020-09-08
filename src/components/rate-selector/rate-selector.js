import React from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import get from "lodash/get.js";

import colors from "../../lib/styles/colors/colors.js";
import formatRate from "../../lib/helpers/format-rate/format-rate.js";
import store from "../../store/store.js";
import currencies from "../../lib/consts/currencies/currencies.js";

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

function calculateRate() {
    const targetRate = get(store, "rates.target", "");
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const selectedCurrencySymbol = get(currencies, `[${selectedCurrency}].symbol`, "");
    const targetCurrencySymbol = get(currencies, `[${targetCurrency}].symbol`, "");

    return selectedCurrency === targetCurrency
        ? ""
        : formatRate(targetRate, {selectedCurrencySymbol, targetCurrencySymbol});
}

function RateSelector() {
    const rate = calculateRate();

    return rate ? (
        <Wrapper>
            <TextRate>{rate}</TextRate>
        </Wrapper>
    ) : null;
}

export default observer(RateSelector);
