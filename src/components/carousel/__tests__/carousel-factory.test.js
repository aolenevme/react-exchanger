import React from "react";
import renderer from "react-test-renderer";

import CarouselFactory from "../carousel-factory.js";

describe("<CarouselFactory />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<CarouselFactory />).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<CarouselFactory areTargetPockets/>).toJSON())
            .toMatchSnapshot();
    });
});
