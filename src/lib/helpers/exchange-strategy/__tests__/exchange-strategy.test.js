import exchangeStrategy from "../exchange-strategy.js";

describe("Exchange strategy", () => {
    it("produces correct results", () => {
        expect(exchangeStrategy("", 0.5)).toEqual("");
        expect(exchangeStrategy(0, 0.5)).toEqual("0.00");
        expect(exchangeStrategy(1, 0.5)).toEqual("0.50");
        expect(exchangeStrategy(0.333, 0.5)).toEqual("0.17");
        expect(exchangeStrategy(10.5, 0.5)).toEqual("5.25");
    })
})
