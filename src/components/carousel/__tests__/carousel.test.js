import React from "react";
import renderer from "react-test-renderer";

import Carousel from "../carousel.js";

describe("<Carousel />", () => {
    describe("rendering", () => {
        it("is rendered correctly", () => {
            expect(renderer
                .create(<Carousel />)
                .toJSON()).toMatchSnapshot();
        });
    });
});
