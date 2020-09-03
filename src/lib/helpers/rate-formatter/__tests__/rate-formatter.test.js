import rateFormatter from '../rate-formatter.js';

describe("Rate formatter", () => {
    it("formats rate correctly", () => {
        expect(rateFormatter(1)).toEqual(["1", "00"])
        expect(rateFormatter(1.12)).toEqual(["1", "12"])
        expect(rateFormatter(1.4756)).toEqual(["1", "47", "56"])
        expect(rateFormatter(1.47566)).toEqual(["1", "47", "57"])
        expect(rateFormatter(100.1234)).toEqual(["100", "12", "34"])
        expect(rateFormatter(0)).toEqual([])
        expect(rateFormatter(-1)).toEqual([])
    })
})
