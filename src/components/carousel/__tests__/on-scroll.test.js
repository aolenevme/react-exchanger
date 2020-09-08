import onScroll from "../on-scroll.js";
import * as registry from "../../../lib/state-management/registry.js";
import MUTATE_STORE from "../../../events/mutate-store.js";
import checkStoreMutations from "../../../lib/tests/check-store-mutations.js";

describe("onScroll", () => {
    beforeEach(() => {
        registry.dispatch = jest.fn();
    });

    afterEach(() => {
        registry.dispatch.mockClear();
    });

    it("always resets typed value", () => {
        onScroll();

        checkStoreMutations(1, MUTATE_STORE, [["exchangeAmount"], ""]);
    });

    describe("active currency mutations", () => {
        it("updates targetCurrency", () => {
            const areTargetPockets = true;
            const newActiveCurrency = "USD";

            onScroll(areTargetPockets, newActiveCurrency);

            checkStoreMutations(0, MUTATE_STORE, [["targetCurrency"], newActiveCurrency]);
        });

        it("updates selectedCurrency", () => {
            const areTargetPockets = false;
            const newActiveCurrency = "USD";

            onScroll(areTargetPockets, newActiveCurrency);

            checkStoreMutations(0, MUTATE_STORE, [["selectedCurrency"], newActiveCurrency]);
        });
    });
});
