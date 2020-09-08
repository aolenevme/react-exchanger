import React from "react";
import renderer from "react-test-renderer";

import * as store from "../../../store/store.js";
import RateSelector from "../rate-selector.js";
import currencies from "../../../lib/consts/currencies/currencies.js";

describe("<RateSelector />", () => {
    it("is rendered", () => {
        store.default = {
            ...store.default,
            ...{
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.EUR.abbreviation
            }
        };

        expect(renderer
            .create(<RateSelector />)
            .toJSON()).toMatchSnapshot();
    });

    it("is not rendered when selected and target currencies are equal", () => {
        store.default = {
            ...store.default,
            ...{
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.USD.abbreviation
            }
        };

        expect(renderer
            .create(<RateSelector />)
            .toJSON()).toMatchSnapshot();
    });
});
