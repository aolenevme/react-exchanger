import React from "react";
import renderer from "react-test-renderer";

import RateSelector from "../rate-selector.js";

describe("<Selector />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<RateSelector ratio={1.457} currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: "$"
            }}/>)
            .toJSON()).toMatchSnapshot();
    });

    it("is not rendered when props are incorrect", () => {
        expect(renderer
            .create(<RateSelector ratio="it-is-not-a-number" currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<RateSelector ratio={1.457} currencySigns={{
                fromCurrencySign: {not: "char"},
                toCurrencySign: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<RateSelector ratio={1.457} currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: {not: "char"}
            }}/>).toJSON())
            .toMatchSnapshot();
    });
});
