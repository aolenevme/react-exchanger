import React, {
    useEffect, useRef, useState
} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import findIndex from "lodash/findIndex.js";
import map from "lodash/map.js";

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

function scrollToPocket(carouselElement, onScroll, getNextPocketIdx, pockets) {
    const nextPocketIdx = getNextPocketIdx();
    const newActiveCurrency = pockets[nextPocketIdx].currency;

    onScroll(newActiveCurrency);
    // eslint-disable-next-line max-len
    carouselElement.current.children[nextPocketIdx].scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
}

function getActivePocketIdx(activeCurrency = "", pockets = []) {
    return findIndex(pockets, ({currency}) => currency === activeCurrency);
}

function Pockets({pockets = []}) {
    return map(pockets, (pocket) => <FlexedPocket key={pocket.currency} {...pocket} />);
}

function Dots({currentPocketIdx = 0, pockets = []}) {
    return map(pockets, (pocket, index) => <Dot key={pocket.currency} isActive={index === currentPocketIdx}/>);
}

function Carousel({
    className, activeCurrency = "", pockets = [], onScroll = () => ({})
}) {
    const currentPocketIdx = getActivePocketIdx(activeCurrency, pockets);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const carouselElement = useRef(null);

    useEffect(() => {
        scrollToPocket(carouselElement, onScroll, () => currentPocketIdx, pockets);
    }, [currentPocketIdx, onScroll, pockets]);

    useEffect(() => {
        if (startX < endX && currentPocketIdx !== pockets.length - 1) {
            scrollToPocket(carouselElement, onScroll, () => currentPocketIdx + 1, pockets);
        } else if (startX > endX && currentPocketIdx !== 0) {
            scrollToPocket(carouselElement, onScroll, () => currentPocketIdx - 1, pockets);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startX]);

    return (
        <div className={className}>
            <PocketsWrapper
                ref={carouselElement}
                onMouseUp={(mouseEvent) => setStartX(mouseEvent.clientX)}
                onMouseDown={(mouseEvent) => setEndX(mouseEvent.clientX)}>
                <Pockets pockets={pockets}/>
            </PocketsWrapper>
            <DotsWrapper>
                <Dots currentPocketIdx={currentPocketIdx} pockets={pockets} />
            </DotsWrapper>
        </div>);
}

export default observer(Carousel);
