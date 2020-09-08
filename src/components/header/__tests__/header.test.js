import React from "react";
import renderer from "react-test-renderer";

import Header from "../header.js";
import * as registry from "../../../lib/state-management/registry.js";

describe("<Header />", () => {
    beforeEach(() => {
        registry.dispatch = jest.fn();
    });

    afterEach(() => {
        registry.dispatch.mockClear();
    });

    it("is rendered correctly", () => {
        expect(renderer
            .create(<Header />)
            .toJSON()).toMatchSnapshot();
    });

    describe("events", () => {
        it("resets value on Cancel", () => {
            renderer
                .create(<Header />)
                .toJSON().children[0].props.onClick();

            expect(registry.dispatch).toHaveBeenCalled();
        });
    });
});
