import React from "react";
import renderer from "react-test-renderer";

import * as registry from "../../../lib/state-management/registry.js";
import MUTATE_STORE from "../../../events/mutate-store.js";
import CarouselInput from "../carousel-input.js";
import checkStoreMutations from "../../../lib/tests/check-store-mutations.js";

describe("<CarouselInput />", () => {
    describe("rendering", () => {
        it("is rendered correctly", () => {
            expect(renderer
                .create(<CarouselInput />).toJSON())
                .toMatchSnapshot();

            expect(renderer
                .create(<CarouselInput isDisabled inputSign="£" value={12} />).toJSON())
                .toMatchSnapshot();

            expect(renderer
                .create(<CarouselInput isDisabled inputSign="£" value="0.00" />).toJSON())
                .toMatchSnapshot();
        });
    });

    describe("events", () => {
        beforeEach(() => {
            registry.dispatch = jest.fn();
        });

        afterEach(() => {
            registry.dispatch.mockClear();
        });

        const bigTestBalance = 500;

        it("updates store with a new digit value", () => {
            const testInputEvent = {target: {value: 123}};

            // eslint-disable-next-line no-magic-numbers,max-len
            renderer.create(<CarouselInput balance={bigTestBalance}/>).toJSON().children[2].props.onInput(testInputEvent);

            checkStoreMutations(0, MUTATE_STORE, [["exchangeAmount"], testInputEvent.target.value]);
        });

        it("updates the html input element with a previous input value and resets store in an emergency case", () => {
            const prevInputValue = 123;
            const testInputEvent = {target: {value: ""}};

            renderer.create(<CarouselInput
                balance={bigTestBalance}
                value={prevInputValue} />)
                // eslint-disable-next-line no-magic-numbers
                .toJSON().children[2].props.onInput(testInputEvent);

            checkStoreMutations(0, MUTATE_STORE, [["exchangeAmount"], ""]);
            expect(testInputEvent.target.value).toEqual(prevInputValue);
        });

        it("doesn`t allow to use floats with more than 2 digits after the dot", () => {
            const prevInputValue = 123.12;
            const testInputEvent = {target: {value: 123.123}};

            // eslint-disable-next-line no-magic-numbers,max-len
            renderer.create(<CarouselInput balance={bigTestBalance} value={prevInputValue} />).toJSON().children[2].props.onInput(testInputEvent);

            checkStoreMutations(0, MUTATE_STORE, [["exchangeAmount"], prevInputValue]);
        });

        it("doesn`t allow add more than there is on the balance", () => {
            const lowTestBalance = 123.13;
            const prevInputValue = 123.12;
            const testInputEvent = {target: {value: 123.14}};

            // eslint-disable-next-line no-magic-numbers,max-len
            renderer.create(<CarouselInput balance={lowTestBalance} value={prevInputValue} />).toJSON().children[2].props.onInput(testInputEvent);

            checkStoreMutations(0, MUTATE_STORE, [["exchangeAmount"], prevInputValue]);
        });
    });
});
