import React from "react";
import renderer from "react-test-renderer";

import Button from "../button.js";

describe("<Button />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<Button isDisabled/>)
            .toJSON()).toMatchSnapshot();

        expect(renderer
            .create(<Button isDisabled={false}/>)
            .toJSON()).toMatchSnapshot();
    });
});
