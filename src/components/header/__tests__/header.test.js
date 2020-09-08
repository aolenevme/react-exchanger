import React from "react";
import renderer from "react-test-renderer";

import Header from "../header.js";
import * as registry from "../../../lib/state-management/registry.js";
import * as store from "../../../store/store.js";
import currencies from "../../../lib/consts/currencies/currencies.js";
import MUTATE_STORE from "../../../events/mutate-store.js";
import checkStoreMutations from "../../../lib/tests/check-store-mutations.js";

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

        it("transfer money on Exchange and resets exchange amount", () => {
            store.default = {
                exchangeAmount: 10,
                selectedCurrency: currencies.USD.abbreviation,
                targetCurrency: currencies.EUR.abbreviation,
                rates: {
                    target: 0.9
                },
                balances: {
                    [currencies.USD.abbreviation]: 50,
                    [currencies.EUR.abbreviation]: 40
                }
            };

            renderer
                .create(<Header />)
                // eslint-disable-next-line no-magic-numbers
                .toJSON().children[2].props.onClick();

            checkStoreMutations(0, MUTATE_STORE, [["balances", currencies.USD.abbreviation], "40.00"]);
            checkStoreMutations(1, MUTATE_STORE, [["balances", currencies.EUR.abbreviation], "49.00"]);
            // eslint-disable-next-line no-magic-numbers
            checkStoreMutations(2, MUTATE_STORE, [["exchangeAmount"], ""]);
        });
    });
});
