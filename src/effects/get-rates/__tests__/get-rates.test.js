import {preEffect, effect} from "../get-rates.js";
import currencies from "../../../lib/consts/currencies/currencies.js";
import * as httpClient from "../../../services/http-client/http-client.js";

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

    // describe("postEffect", () => {
    //     function checkMutateStore(
    //         dispatchIdx,
    //         goldenDispatchId,
    //         goldenMutationEvent
    //     ) {
    //         const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[
    //             dispatchIdx
    //             ];
    //
    //         expect(dispatchId).toEqual(goldenDispatchId);
    //         mutationEvent && expect(mutationEvent()).toEqual(goldenMutationEvent);
    //     }
    //
    //     it("set scenario after all", () => {
    //         registry.dispatch = jest.fn();
    //
    //         const testScenario = scenarios.UC1;
    //
    //         postEffect({}, testScenario);
    //
    //         checkMutateStore(0, MUTATE_STORE, [["scenario"], testScenario]);
    //         checkMutateStore(1, NAVIGATE);
    //
    //         registry.dispatch.mockClear();
    //     });
    // });
});
