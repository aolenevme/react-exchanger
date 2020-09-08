import onScroll from "../on-scroll.js";
import * as registry from "../../../lib/state-management/registry.js";
import MUTATE_STORE from "../../../events/mutate-store.js";

describe("onScroll", () => {
    it("always resets typed value", () => {
        registry.dispatch = jest.fn();
        onScroll();

        // eslint-disable-next-line prefer-destructuring
        const [dispatchId, mutationEvent] = registry.dispatch.mock.calls[1];

        expect(dispatchId).toEqual(MUTATE_STORE);
        expect(mutationEvent()).toEqual([["exchangeAmount"], ""]);
    });
});
