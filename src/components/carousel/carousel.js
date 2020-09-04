import React from "react";
import styled from "styled-components";

import Exchanger from "../exchanger/exchanger.js";

const Wrapper = styled.div`
    display: flex;
    width: 30%;
    
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar { 
        display: none;
    }
`;

function Carousel() {
    return <Wrapper>
        <Exchanger />
        <Exchanger />
        <Exchanger />
    </Wrapper>;
}

export default Carousel;
