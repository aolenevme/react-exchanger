import React from "react";
import renderer from "react-test-renderer";

import CarouselFactory from "../carousel-factory.js";
import currencies from "../../../lib/consts/currencies/currencies.js";
import * as store from "../../../store/store.js";

describe("<CarouselFactory />", () => {
    describe("rendering", () => {
        it("is rendered correctly", () => {
            expect(renderer
                .create(<CarouselFactory />).toJSON())
                .toMatchSnapshot();

            expect(renderer
                .create(<CarouselFactory areTargetPockets/>).toJSON())
                .toMatchSnapshot();
        });

        it("is rendered correctly with mocked store", () => {
            store.default = {
                ...store.default,
                ...{
                    selectedCurrency: currencies.USD.abbreviation,
                    targetCurrency: currencies.USD.abbreviation
                }
            };

            expect(renderer
                .create(<CarouselFactory areTargetPockets/>).toJSON())
                .toMatchSnapshot();

            expect(renderer
                .create(<CarouselFactory />).toJSON())
                .toMatchSnapshot();
        });
    });
});
