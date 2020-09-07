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
        });
    });

    describe("events", () => {
        it("mutates store with new value", () => {
            registry.dispatch = jest.fn();

            const testInputEvent = {target: {value: 123}};

            renderer.create(<CarouselInput />).toJSON().children[1].props.onInput(testInputEvent);

            // eslint-disable-next-line prefer-destructuring
            const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[0];

            expect(dispatchId).toEqual(MUTATE_STORE);
            expect(mutationEvent()).toEqual([["exchangeAmount"], testInputEvent.target.value]);

            registry.dispatch.mockClear();
        });
    });
});
