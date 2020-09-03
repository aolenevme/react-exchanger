import React from "react";
import renderer from "react-test-renderer";

import Input from "../input.js";

describe("<Input />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<Input isDisabled/>)
            .toJSON()).toMatchSnapshot();

        expect(renderer
            .create(<Input isDisabled={false}/>)
            .toJSON()).toMatchSnapshot();

        expect(renderer
            .create(<Input isDisabled value="2020"/>)
            .toJSON()).toMatchSnapshot();

        expect(renderer
            .create(<Input isDisabled={false} value="2020"/>)
            .toJSON()).toMatchSnapshot();
    });

    describe("events", () => {
        it("reacts to onInput", () => {
            const onInput = jest.fn();

            const tree = renderer
                .create(<Input onInput={onInput}/>)
                .toJSON();

            tree.children[1].props.onInput();

            expect(onInput).toHaveBeenCalled();
        });
    });
});
