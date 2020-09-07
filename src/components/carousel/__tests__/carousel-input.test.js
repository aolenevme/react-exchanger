import React from "react";
import renderer from "react-test-renderer";

import * as registry from "../../../lib/state-management/registry.js";
import MUTATE_STORE from "../../../events/mutate-store.js";
import CarouselInput from "../carousel-input.js";

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

        it("updates store with a new digit value", () => {
            const testInputEvent = {target: {value: 123}};

            // eslint-disable-next-line no-magic-numbers
            renderer.create(<CarouselInput />).toJSON().children[2].props.onInput(testInputEvent);

            // eslint-disable-next-line prefer-destructuring
            const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[0];

            expect(dispatchId).toEqual(MUTATE_STORE);
            expect(mutationEvent()).toEqual([["exchangeAmount"], testInputEvent.target.value]);
        });

        it("updates store with a previous input value in an emergency case", () => {
            const prevInputValue = 123;
            const testInputEvent = {target: {value: ""}};

            // eslint-disable-next-line no-magic-numbers,max-len
            renderer.create(<CarouselInput value={prevInputValue} />).toJSON().children[2].props.onInput(testInputEvent);

            // eslint-disable-next-line prefer-destructuring
            const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[0];

            expect(dispatchId).toEqual(MUTATE_STORE);
            expect(mutationEvent()).toEqual([["exchangeAmount"], prevInputValue]);
        });
    });
});
