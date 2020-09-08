import constant from "lodash/constant.js";

import {mutateStore} from "../mutate-store.js";

describe("Change mutate store event", () => {
    it("is emitted correctly", () => {
        const testStore = {random: {value: "here"}};
        const mutateStoreEvent = [["random", "value"], "new value here"];
        const result = mutateStore(testStore, constant(mutateStoreEvent));

        expect(result).toEqual(mutateStoreEvent);
    });

    it("doesn`t change anything if new state is not listed among all allowed states", () => {
        const testStore = {random: {value: "here"}};
        const mutateStoreEvent = ["incorrect-path", "new value here"];

        expect(() => {
            mutateStore(testStore, constant(mutateStoreEvent));
        }).toThrow();
    });
});
