import onScroll from "../on-scroll.js";
import * as registry from "../../../lib/state-management/registry.js";
import MUTATE_STORE from "../../../events/mutate-store.js";

function checkMutations(dispatchIdx, goldenDispatchId, goldenMutationEvent) {
    const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[dispatchIdx];

    expect(dispatchId).toEqual(goldenDispatchId);
    expect(mutationEvent()).toEqual(goldenMutationEvent);
}

describe("onScroll", () => {
    beforeEach(() => {
        registry.dispatch = jest.fn();
    });

    afterEach(() => {
        registry.dispatch.mockClear();
    });

    it("always resets typed value", () => {
        onScroll();

        checkMutations(1, MUTATE_STORE, [["exchangeAmount"], ""]);
    });

    describe("active currency mutations", () => {
        it("updates targetCurrency", () => {
            const areTargetPockets = true;
            const newActiveCurrency = "USD";

            onScroll(areTargetPockets, newActiveCurrency);

            checkMutations(0, MUTATE_STORE, [["targetCurrency"], newActiveCurrency]);
        });

        it("updates selectedCurrency", () => {
            const areTargetPockets = false;
            const newActiveCurrency = "USD";

            onScroll(areTargetPockets, newActiveCurrency);

            checkMutations(0, MUTATE_STORE, [["selectedCurrency"], newActiveCurrency]);
        });
    });
});
