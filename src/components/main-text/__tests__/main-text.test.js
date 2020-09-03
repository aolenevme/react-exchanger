import React from "react";
import renderer from "react-test-renderer";

import MainText from "../main-text.js";

describe("<MainText />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<MainText>GBP</MainText>)
            .toJSON()).toMatchSnapshot();
    });
});
