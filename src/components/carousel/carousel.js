import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import map from "lodash/map.js";

import Exchanger from "../exchanger/exchanger.js";

const Wrapper = styled.div`
    display: flex;
    width: 233px;
    
    overflow: hidden;
`;

const exchangerInfo = Object.freeze({
    currencyName: "USD",
    prefix: constant("-"),
    typedMoney: 145.67,
    accountInfo: "You have 58.33 dollars",
    formattedRate: "£1 = $1.45"
});

const wallets = [exchangerInfo, exchangerInfo, exchangerInfo];

function Exchangers() {
    return map(wallets, (info) => <Exchanger info={info} />);
}

function Carousel() {
    const [exchangerIdx, updateExchangerIdx] = useState(0);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const carouselElement = useRef(null);

    useEffect(() => {
        if (startX < endX && exchangerIdx !== wallets.length - 1) {
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
            <Exchangers />
        </Wrapper>);
}

export default Carousel;
