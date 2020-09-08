import React from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import get from "lodash/get.js";

import Button from "../button/button.js";
import RateSelector from "../rate-selector/rate-selector.js";
import {dispatch} from "../../lib/state-management/registry.js";
import MUTATE_STORE from "../../events/mutate-store.js";
import store from "../../store/store.js";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0 1rem;

    height: 2rem;
`;

function isExchangeDisabled() {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");
    const exchangeAmount = get(store, "exchangeAmount", "");

    return selectedCurrency === targetCurrency || Number(exchangeAmount) === 0;
}

function Header() {
    return <Wrapper>
        <Button onClick={() => dispatch(MUTATE_STORE, () => [["exchangeAmount"], ""])}>Cancel</Button>
        <RateSelector />
        <Button isDisabled={isExchangeDisabled()}>Exchange</Button>
    </Wrapper>;
}

export default observer(Header);
