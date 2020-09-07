import React from "react";
import renderer from "react-test-renderer";

import RateSelector from "../rate-selector.js";

describe("<RateSelector />", () => {
    it("is rendered correctly", () => {
        expect(renderer
            .create(<RateSelector rate={1.457} currencySymbols={{
                selectedCurrencySymbol: "£",
                targetCurrencySymbol: "$"
            }}/>)
            .toJSON()).toMatchSnapshot();
    });

    it("is not rendered when props are incorrect", () => {
        expect(renderer
            .create(<RateSelector rate="it-is-not-a-number" currencySymbols={{
                selectedCurrencySymbol: "£",
                targetCurrencySymbol: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<RateSelector rate={1.457} currencySymbols={{
                selectedCurrencySymbol: {not: "char"},
                targetCurrencySymbol: "$"
            }}/>).toJSON())
            .toMatchSnapshot();

        expect(renderer
            .create(<RateSelector rate={1.457} currencySymbols={{
                selectedCurrencySymbol: "£",
                targetCurrencySymbol: {not: "char"}
            }}/>).toJSON())
            .toMatchSnapshot();
    });
});
