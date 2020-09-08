import {preEffect} from "../get-rates.js";
import currencies from "../../../lib/consts/currencies/currencies.js";

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

    // describe("effect", () => {
    //     beforeEach(() => {
    //         global.fetch = jest.fn;
    //     });
    //
    //     afterEach(() => {
    //         httpClient.default.mockClear();
    //     });
    //
    //     const mockEffectPayload = {
    //         url: "/clients/is-exist-by-login",
    //         options: {},
    //     };
    //
    //     const bodyByScenario = {
    //         [scenarios.UC3]: {
    //             isExist: true,
    //         },
    //
    //         [scenarios.UC1]: {},
    //     };
    //
    //     forEach(bodyByScenario, (body, scenario) => {
    //         it(`handles 200 status code flow correctly for ${scenario}`, async () => {
    //             httpClient.default = jest.fn(() => ({
    //                 status: 200,
    //                 json: () => body,
    //             }));
    //
    //             const fetchResponse = effect(mockEffectPayload);
    //
    //             await expect(fetchResponse).resolves.toEqual(scenario);
    //         });
    //     });
    //
    //     it("handles default flow correctly", async () => {
    //         httpClient.default = jest.fn(() => ({
    //             status: 400,
    //             json: () => ({}),
    //         }));
    //
    //         const fetchResponse = effect(mockEffectPayload);
    //
    //         await expect(fetchResponse).resolves.toEqual(scenarios.UC3);
    //     });
    // });

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
