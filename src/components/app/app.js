import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import get from "lodash/get.js";

import CarouselFactory from "../carousel/carousel-factory.js";
import Button from "../button/button.js";
import RateSelector from "../rate-selector/rate-selector.js";
import colors from "../../lib/styles/colors/colors.js";
import rateFormatter from "../../lib/helpers/rate-formatter/rate-formatter.js";
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

const TargetCarouselFactory = styled(CarouselFactory)`
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${colors.primaryDark};
`;

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
    const getTargetWalletsSpecification = constant({inputSign: "+", isDisabled: true, getRate: formRateString});

    return <Wrapper>
        <Header>
            <Button>Cancel</Button>
            <RateSelector rate={1.457} currencySymbols={{
                selectedCurrencySymbol: "£",
                targetCurrencySymbol: "$"
            }} />
            <Button>Exchange</Button>
        </Header>
        <CarouselFactory getSpecification={getSelectedWalletsSpecification} />
        <Triangle />
        <TargetCarouselFactory getSpecification={getTargetWalletsSpecification} />
    </Wrapper>;
}

export default App;
