import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import get from "lodash/get.js";

import CarouselFactory from "../carousel/carousel-factory.js";
import Header from "../header/header.js";
import colors from "../../lib/styles/colors/colors.js";
import store from "../../store/store.js";
import {dispatchFx} from "../../lib/state-management/registry-fx.js";
import GET_RATES_FX from "../../effects/get-rates/get-rates.js";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    position: relative;

    padding-top: 1rem;

    width: 400px;

    border-radius: 8px;

    background-color: ${colors.primary};
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

const TargetCarouselFactory = styled(CarouselFactory)`
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${colors.primaryDark};
`;

function App() {
    const selectedCurrency = get(store, "selectedCurrency", "");
    const targetCurrency = get(store, "targetCurrency", "");

    useEffect(() => {
        getRates(selectedCurrency, targetCurrency);
    }, [selectedCurrency, targetCurrency]);

    useEffect(() => {
        const TIMEOUT_MS = 10000;
        const timerId = setInterval(async () => {
            await getRates(selectedCurrency, targetCurrency);
        }, TIMEOUT_MS);

        return () => clearInterval(timerId);
    }, [selectedCurrency, targetCurrency]);

    return <Wrapper>
        <Header />
        <CarouselFactory />
        <Triangle />
        <TargetCarouselFactory areTargetPockets />
    </Wrapper>;
}

async function getRates(selectedCurrency, targetCurrency) {
    if (selectedCurrency !== targetCurrency) {
        await dispatchFx(GET_RATES_FX, {base: selectedCurrency, symbol: targetCurrency});
        await dispatchFx(GET_RATES_FX, {base: targetCurrency, symbol: selectedCurrency});
    }
}

export default observer(App);
