import React, {
    useEffect, useRef, useState
} from "react";
import styled from "styled-components";
import constant from "lodash/constant.js";
import map from "lodash/map.js";

import Input from "../input/input.js";
import Pocket from "../pocket/pocket.js";
import colors from "../../lib/styles/colors/colors.js";

const PocketsWrapper = styled.div`
    display: flex;
    
    width: 100%;
    
    overflow: hidden;
`;

const FlexedPocket = styled(Pocket)`
    flex: 0 0 100%;
`;

const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
    
    padding-bottom: 2rem;
`;

const Dot = styled.span`
    display: inline-block;

    margin: 0 0.142rem;

    width: 0.5rem;
    height: 0.5rem;

    border-radius: 50%;

    background-color: ${({isActive}) => (isActive
    ? colors.textPrimary
    : colors.textPrimaryDark)};

    transition: background-color 0.1s ease 0s;
`;

const pockets = [{
    currency: "USD",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$",
    rate: "£1 = $1.45"
}, {
    currency: "EUR",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$",
    rate: "£1 = $1.45"
}, {
    currency: "GBP",
    input: constant(<Input prefix={constant("-")} value={145.67} />),
    balance: "You have 58.33$",
    rate: "£1 = $1.45"
}];

function Pockets() {
    return map(pockets, (pocket) => <FlexedPocket key={pocket.currency} {...pocket} />);
}

function Dots({currentPocketIdx = 0}) {
    return map(pockets, (pocket, index) => <Dot key={pocket.currency} isActive={index === currentPocketIdx}/>);
}

function Carousel({className}) {
    const [currentPocketIdx, updateCurrentPocketIdx] = useState(0);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const carouselElement = useRef(null);

    useEffect(() => {
        if (startX < endX && currentPocketIdx !== pockets.length - 1) {
            updateCurrentPocketIdx(currentPocketIdx + 1);
        } else if (startX > endX && currentPocketIdx !== 0) {
            updateCurrentPocketIdx(currentPocketIdx - 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startX]);

    useEffect(() => {
        console.log(carouselElement);
        // eslint-disable-next-line max-len
        carouselElement.current.children[currentPocketIdx].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
    }, [currentPocketIdx]);

    return (
        <div className={className}>
            <PocketsWrapper
                ref={carouselElement}
                onMouseUp={(mouseEvent) => setStartX(mouseEvent.clientX)}
                onMouseDown={(mouseEvent) => setEndX(mouseEvent.clientX)}>
                <Pockets />
            </PocketsWrapper>
            <DotsWrapper>
                <Dots currentPocketIdx={currentPocketIdx} />
            </DotsWrapper>
        </div>);
}

export default Carousel;
