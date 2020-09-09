import * as httpClient from "../../../services/http-client/http-client.js";
import * as registry from "../../../lib/state-management/registry.js";
import checkStoreMutations from "../../../lib/tests/check-store-mutations.js";
import currencies from "../../../lib/consts/currencies/currencies.js";
import MUTATE_STORE from "../../../events/mutate-store.js";
import {preEffect, effect, postEffect} from "../get-rates.js";

describe("Get rates effect", () => {
    it("preEffect is correct", () => {
        const payload = {base: currencies.USD.abbreviation, symbol: currencies.EUR.abbreviation};

        expect(preEffect({}, payload)).toEqual({
            url: `https://api.exchangeratesapi.io/latest?base=${payload.base}&symbols=${payload.symbol}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        expect(preEffect({}, {})).toEqual({
            url: `https://api.exchangeratesapi.io/latest?base=&symbols=`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    });

    describe("effect", () => {
        afterEach(() => {
            httpClient.default.mockClear();
        });

        it("returns empty array if something went wrong", async () => {
            httpClient.default = jest.fn(() => ({status: 400}));

            await expect(effect({})).resolves.toEqual([]);
        });

        it("returns rate entry if everything is OK", async () => {
            const testResponse = {status: 200, data: {rates: {USD: 1.134}}};

            httpClient.default = jest.fn(() => (testResponse));

            await expect(effect({})).resolves.toEqual(["USD", testResponse.data.rates.USD]);
        });
    });

    describe("postEffect", () => {
        afterEach(() => {
            registry.dispatch.mockClear();
        });
        it("correctly sets target rate", () => {
            registry.dispatch = jest.fn();

            const testStore = {selectedCurrency: currencies.USD.abbreviation};

            // eslint-disable-next-line no-magic-numbers
            const testEntry = [currencies.USD.abbreviation, 123];

            postEffect(testStore, testEntry);

            checkStoreMutations(0, MUTATE_STORE, [["rates", "target"], testEntry[1]]);
        });

        it("correctly sets selected rate", () => {
            registry.dispatch = jest.fn();

            const testStore = {selectedCurrency: currencies.EUR.abbreviation};

            // eslint-disable-next-line no-magic-numbers
            const testEntry = [currencies.USD.abbreviation, 123];

            postEffect(testStore, testEntry);

            checkStoreMutations(0, MUTATE_STORE, [["rates", "selected"], testEntry[1]]);
        });
    });
});
