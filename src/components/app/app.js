import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import get from "lodash/get.js";

import colors from "../../lib/styles/colors/colors.js";
import CarouselFactory from "../carousel/carousel-factory.js";
import Header from "../header/header.js";
import {dispatchFx} from "../../lib/state-management/registryFx.js";
import GET_RATES_FX from "../../effects/get-rates/get-rates.js";
import store from "../../store/store.js";

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
        dispatchFx(GET_RATES_FX, {base: selectedCurrency, symbol: targetCurrency});
        dispatchFx(GET_RATES_FX, {base: targetCurrency, symbol: selectedCurrency});
    }, [selectedCurrency, targetCurrency]);

    return <Wrapper>
        <Header />
        <CarouselFactory />
        <Triangle />
        <TargetCarouselFactory areTargetPockets />
    </Wrapper>;
}

export default observer(App);
