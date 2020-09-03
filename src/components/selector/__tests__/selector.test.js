import React from "react";
import renderer from "react-test-renderer";

import Selector from "../selector.js";

describe("<Selector />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<Selector ratio={1.457} currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: "$"
            }}/>)
            .toJSON()).toMatchSnapshot();
    });

    it("is not rendered when props are incorrect", () => {
        expect(renderer
            .create(<Selector ratio="it-is-not-a-number" currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<Selector ratio={1.457} currencySigns={{
                fromCurrencySign: {not: "char"},
                toCurrencySign: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<Selector ratio={1.457} currencySigns={{
                fromCurrencySign: "£",
                toCurrencySign: {not: "char"}
            }}/>).toJSON())
            .toMatchSnapshot();
    });
});
