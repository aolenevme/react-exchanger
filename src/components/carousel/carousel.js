import React, {useEffect, useRef, useState} from "react";
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
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const carouselElement = useRef(null);

    useEffect(() => {
        if (startX < endX) {
            carouselElement.current.children[1].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
        } else if (startX > endX) {
            carouselElement.current.children[0].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startX]);

    return (
        <Wrapper
            ref={carouselElement}
            onMouseUp={(mouseEvent) => setStartX(mouseEvent.clientX)}
            onMouseDown={(mouseEvent) => setEndX(mouseEvent.clientX)}>
            <Exchanger />
            <Exchanger />
            <Exchanger />
        </Wrapper>);
}

export default Carousel;
