import React from "react";
import renderer from "react-test-renderer";

import Header from "../header.js";

describe("<Header />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<Header />)
            .toJSON()).toMatchSnapshot();
    });
});
