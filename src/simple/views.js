import React, {useState} from "react";
import {observer} from "mobx-react-lite";

import {dispatch} from "../lib/registry.js";
import {dispatchFx} from "../lib/registryFx.js";
import Button from "../components/button/button.js";
import Input from "../components/input/input.js";
import MainText from "../components/main-text/main-text.js";
import InfoText from "../components/info-text/info-text.js";
import RateSelector from "../components/rate-selector/rate-selector.js";
import Exchanger from "../components/exchanger/exchanger.js";

import queries from "./queries.js";
import storeEventIds from "./events.js";
import fxEventIds from "./effects.js";
// eslint-disable-next-line import/max-dependencies
import {ClockS, UIS} from "./styled.js";

const CHANGE_TIME_TIMEOUT = 1000;

function Clock({time, timeColor}) {
    return <ClockS timeColor={timeColor}>{time}</ClockS>;
}

function ColorInput({timeColor}) {
    return (
        <div>
            <input
                type="text"
                value={timeColor}
                onChange={(changeEvent) => dispatch(storeEventIds.TIME_COLOR, changeEvent.target.value)
                }
            />
        </div>
    );
}

function UI() {
    dispatch(storeEventIds.CURRENT_TIME, new Date().toString());

    // Side effects, initialization events, and onMount events, and etc
    setTimeout(
        () => dispatchFx(
            fxEventIds.CURRENT_TIME_2_STORAGE,
            new Date().toString(),
            (store, newDate) => dispatch(storeEventIds.CURRENT_TIME, newDate)
        ),
        CHANGE_TIME_TIMEOUT
    );

    // Get queries
    const {time, timeColor} = queries();

    // eslint-disable-next-line no-magic-numbers
    const [count, setCount] = useState(5);

    // Return view
    return (
        <UIS>
            <MainText>GBP</MainText>
            <InfoText>Bingo!</InfoText>
            <h1>Hello World, it is now!</h1>
            <Button>Exchange</Button>
            <Input value={count} onInput={(inputEvent) => setCount(inputEvent.target.value)}/>
            <RateSelector rate={1.457} currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: "$"
            }}/>
            <Exchanger />
            <Clock time={time} timeColor={timeColor}/>
            <ColorInput timeColor={timeColor}/>
        </UIS>
    );
}

export default observer(UI);
