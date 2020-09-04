import React from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";

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

function Exchanger() {
    return <Wrapper>
        <Content>
            <MainText>USD</MainText>
            <Input prefix={constant("-")} value={145.57}/>
        </Content>

        <WalletInfo>
            <InfoText>You have 58.33 dollars</InfoText>
            <InfoText>£1 = $1.45</InfoText>
        </WalletInfo>
    </Wrapper>;
}

export default Exchanger;
