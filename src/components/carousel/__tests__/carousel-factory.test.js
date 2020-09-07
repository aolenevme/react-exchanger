import React from "react";
import renderer from "react-test-renderer";
import constant from "lodash/constant.js";

import * as registry from "../../../lib/state-management/registry.js";
import CarouselFactory, {inputFactory} from "../carousel-factory.js";
import MUTATE_STORE from "../../../events/mutate-store.js";

describe("<CarouselFactory />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<CarouselFactory />).toJSON())
            .toMatchSnapshot();

        expect(renderer
            // eslint-disable-next-line max-len
            .create(<CarouselFactory getSpecification={constant({inputSign: "-", isDisabled: false, getRate: constant(1)})}/>).toJSON())
            .toMatchSnapshot();
    });

    describe("inputFactory", () => {
        it("creates <Input /> that updates store", () => {
            registry.dispatch = jest.fn();

            const testInputEvent = {target: {value: 123}};

            const Input = inputFactory();

            renderer.create(Input).toJSON().children[1].props.onInput(testInputEvent);

            // eslint-disable-next-line prefer-destructuring
            const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[0];

            expect(dispatchId).toEqual(MUTATE_STORE);
            expect(mutationEvent()).toEqual([["exchangeAmount"], testInputEvent.target.value]);
        });
    });
});
