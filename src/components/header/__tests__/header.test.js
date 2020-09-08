import React from "react";
import renderer from "react-test-renderer";

import Header from "../header.js";
import * as registry from "../../../lib/state-management/registry.js";
import * as store from "../../../store/store.js";
import currencies from "../../../lib/consts/currencies/currencies.js";

describe("<Header />", () => {
    beforeEach(() => {
        registry.dispatch = jest.fn();
    });

    afterEach(() => {
        registry.dispatch.mockClear();
    });

    describe("rendering", () => {
        it("is rendered correctly by default", () => {
            store.default = {
                exchangeAmount: 123,
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.EUR.abbreviation
            };

            expect(renderer
                .create(<Header />)
                .toJSON()).toMatchSnapshot();
        });
    });

    describe("disabled rendering", () => {
        it("is rendering correctly when currencies are equal", () => {
            store.default = {
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.USD.abbreviation,
                exchangeAmount: 123
            };

            expect(renderer
                .create(<Header />)
                .toJSON()).toMatchSnapshot();
        });

        it("is rendering correctly when no exchange amount is typed", () => {
            store.default = {
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.EUR.abbreviation,
                exchangeAmount: ""
            };

            expect(renderer
                .create(<Header />)
                .toJSON()).toMatchSnapshot();
        });
    });

    describe("events", () => {
        it("resets value on Cancel", () => {
            renderer
                .create(<Header />)
                .toJSON().children[0].props.onClick();

            expect(registry.dispatch).toHaveBeenCalled();
        });
    });
});
