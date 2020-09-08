import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import isFunction from "lodash/isFunction.js";
import isString from "lodash/isString.js";

import InfoText from "../info-text/info-text.js";
import MainText from "../main-text/main-text.js";

const Wrapper = styled.div`
    padding: 2rem;
    
    width: 100%;
    
    box-sizing: border-box;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-bottom: 1rem;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 0.3rem;
`;

function Info({children}) {
    return isValidString(children)
        ? <InfoText>{children}</InfoText>
        : null;
}

function isValidString(str) {
    return isString(str) && str.length !== 0;
}

function shouldShow(currency, input) {
    const isCurrencyCorrect = isValidString(currency);
    const isInputCorrect = isFunction(input) && Boolean(input());

    return isCurrencyCorrect && isInputCorrect;
}

function Pocket({
    className, currency = null, input = constant(null), balanceText = null, rate = null
}) {
    return shouldShow(currency, input)
        ? <Wrapper className={className}>
            <Content>
                <MainText>{currency}</MainText>
                {input()}
            </Content>

            <InfoWrapper>
                <Info>{balanceText}</Info>
                <Info>{rate}</Info>
            </InfoWrapper>
        </Wrapper>
        : null;
}

export default Pocket;
