import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import map from "lodash/map.js";

import Input from "../input/input.js";
import Pocket from "../pocket/pocket.js";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    
    overflow: hidden;
`;

const pocketInfo = Object.freeze({
    currency: "USD",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$",
    rate: "£1 = $1.45"
});

const pockets = [pocketInfo, pocketInfo, pocketInfo];

function Pockets() {
    return map(pockets, (info) => <Pocket {...info} />);
}

function Carousel() {
    const [exchangerIdx, updateExchangerIdx] = useState(0);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const carouselElement = useRef(null);

    useEffect(() => {
        if (startX < endX && exchangerIdx !== pockets.length - 1) {
            updateExchangerIdx(exchangerIdx + 1);
        } else if (startX > endX && exchangerIdx !== 0) {
            updateExchangerIdx(exchangerIdx - 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startX]);

    useEffect(() => {
        // eslint-disable-next-line max-len
        carouselElement.current.children[exchangerIdx].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
    }, [exchangerIdx]);

    return (
        <Wrapper
            ref={carouselElement}
            onMouseUp={(mouseEvent) => setStartX(mouseEvent.clientX)}
            onMouseDown={(mouseEvent) => setEndX(mouseEvent.clientX)}>
            <Pockets />
        </Wrapper>);
}

export default Carousel;
