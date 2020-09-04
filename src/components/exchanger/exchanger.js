import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";

import Input from "../input/input.js";
import InfoText from "../info-text/info-text.js";
import MainText from "../main-text/main-text.js";

const Wrapper = styled.div`
    width: 88%;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CurrencyAbbreviation = styled(MainText)`
    margin: 0;
`;

const Balance = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 0.3rem;
`;

const BalanceText = styled(InfoText)`
    margin: 1rem 0;
`;

function Exchanger() {
    return <Wrapper>
        <Content>
            <CurrencyAbbreviation>USD</CurrencyAbbreviation>
            <Input prefix={constant("-")} value={14.57}/>
        </Content>

        <Balance>
            <BalanceText>You have 58.33 dollars</BalanceText>
            <BalanceText>£1 = $1.45</BalanceText>
        </Balance>
    </Wrapper>;
}

export default Exchanger;
