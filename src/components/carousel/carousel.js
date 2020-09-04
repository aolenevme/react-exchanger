import React from "react";
import styled from "styled-components";

import Exchanger from "../exchanger/exchanger.js";

const Wrapper = styled.div`
    display: flex;
    width: 30%;
    
    overflow-y: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar { 
      width: 0 !important 
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
