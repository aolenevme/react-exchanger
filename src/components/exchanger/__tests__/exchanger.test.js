import React from "react";
import renderer from "react-test-renderer";

import Exchanger from "../exchanger.js";

describe("<Exchanger />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<Exchanger/>)
            .toJSON()).toMatchSnapshot();
    });
});
