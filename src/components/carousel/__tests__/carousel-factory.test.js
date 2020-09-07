import React from "react";
import renderer from "react-test-renderer";
import constant from "lodash/constant.js";

import CarouselFactory from "../carousel-factory.js";

describe("<CarouselFactory />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<CarouselFactory />).toJSON())
            .toMatchSnapshot();

        expect(renderer
            // eslint-disable-next-line max-len
            .create(<CarouselFactory getSpecification={constant({inputSign: "-", isDisabled: false, getRate: constant(1)})}/>).toJSON())
            .toMatchSnapshot();
    });
});
