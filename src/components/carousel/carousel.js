import React, {useEffect, useRef} from "react";
import styled from "styled-components";

import Exchanger from "../exchanger/exchanger.js";

const Wrapper = styled.div`
    display: flex;
    width: 233px;
    
    overflow: hidden;
`;

// eslint-disable-next-line max-len
// document.querySelectorAll('.exchanger__Wrapper-sc-1v4o5cb-0')[1].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})
// How to scroll!!

function Carousel() {
    const carouselElement = useRef(null);

    // eslint-disable-next-line max-len,no-magic-numbers
    useEffect(() => setTimeout(() => carouselElement.current.children[1].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"}), 2000), []);

    return <Wrapper ref={carouselElement}>
        <Exchanger />
        <Exchanger />
        <Exchanger />
    </Wrapper>;
}

export default Carousel;
