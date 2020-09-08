import React from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import get from "lodash/get.js";

import Button from "../button/button.js";
import RateSelector from "../rate-selector/rate-selector.js";
import {dispatch} from "../../lib/state-management/registry.js";
import MUTATE_STORE from "../../events/mutate-store.js";
import store from "../../store/store.js";
import exchangeStrategy, {PRECISION}
    from "../../lib/helpers/exchange-strategy/exchange-strategy.js";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0 1rem;

    height: 2rem;
`;

function resetExchangeAmount() {
    dispatch(MUTATE_STORE, () => [["exchangeAmount"], ""]);
}

function isExchangeDisabled() {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const exchangeAmount = get(store, "exchangeAmount", "");

    return selectedCurrency === targetCurrency || Number(exchangeAmount) === 0;
}

// eslint-disable-next-line max-statements
function exchangeBetweenPockets() {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const exchangeAmount = get(store, "exchangeAmount", "");
    const targetRate = get(store, "rates.target", "");
    const targetAmount = exchangeStrategy(exchangeAmount, targetRate);

    const oldSelectedBalance = get(store, `balances[${selectedCurrency}]`, "");
    const oldTargetBalance = get(store, `balances[${targetCurrency}]`, "");

    const newSelectedBalance = (Number(oldSelectedBalance) - Number(exchangeAmount)).toFixed(PRECISION);
    const newTargetBalance = (Number(oldTargetBalance) + Number(targetAmount)).toFixed(PRECISION);

    dispatch(MUTATE_STORE, () => [["balances", selectedCurrency], newSelectedBalance]);
    dispatch(MUTATE_STORE, () => [["balances", targetCurrency], newTargetBalance]);
    resetExchangeAmount();
}

function Header() {
    return <Wrapper>
        <Button onClick={resetExchangeAmount}>Cancel</Button>
        <RateSelector />
        <Button isDisabled={isExchangeDisabled()} onClick={exchangeBetweenPockets}>Exchange</Button>
    </Wrapper>;
}

export default observer(Header);
