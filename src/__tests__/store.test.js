import store from "../store.js";

describe("Store", () => {
    it("is in a correct initial state", () => {
        expect(store).toEqual({
            time: "",
            timeColor: "#f88"
        });
    });
});
