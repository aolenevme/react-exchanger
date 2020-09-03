import React from "react";
import renderer from "react-test-renderer";

import InfoText from "../info-text.js";

describe("<InfoText />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<InfoText>Bingo!</InfoText>)
            .toJSON()).toMatchSnapshot();
    });
});
