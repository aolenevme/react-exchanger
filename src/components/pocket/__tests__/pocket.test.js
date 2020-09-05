import React from "react";
import renderer from "react-test-renderer";
import constant from "lodash/constant.js";

import Pocket from "../pocket.js";

describe("<Pocket />", () => {
    it("is not rendered", () => {
        expect(renderer
            .create(<Pocket/>)
            .toJSON()).toMatchSnapshot();
        expect(renderer
            .create(<Pocket currency=""/>)
            .toJSON()).toMatchSnapshot();
        expect(renderer
            .create(<Pocket currency="USD" input={constant(false)}/>)
            .toJSON()).toMatchSnapshot();
    });

    it("is partially rendered", () => {
        expect(renderer
            .create(<Pocket currency="USD" input={constant(<input />)}/>)
            .toJSON()).toMatchSnapshot();
    });

    it("is fully rendered", () => {
        expect(renderer
            .create(<Pocket currency="USD" input={constant(<input />)} balance="You have $51.12" rate="1$ = 0.69£"/>)
            .toJSON()).toMatchSnapshot();
    });
});
