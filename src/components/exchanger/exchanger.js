import React from "react";
import styled from "styled-components";

import Input from "../input/input.js";
import InfoText from "../info-text/info-text.js";
import MainText from "../main-text/main-text.js";

const Wrapper = styled.div`
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-bottom: 1rem;
`;

const WalletInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 0.3rem;
`;

function Exchanger({info}) {
    const {
        currencyName, prefix, typedMoney, accountInfo, formattedRate
    } = info;

    return <Wrapper>
        <Content>
            <MainText>{currencyName}</MainText>
            <Input prefix={prefix} value={typedMoney}/>
        </Content>

        <WalletInfo>
            <InfoText>{accountInfo}</InfoText>
            <InfoText>{formattedRate}</InfoText>
        </WalletInfo>
    </Wrapper>;
}

export default Exchanger;
