import currencies from "../currencies.js";

describe('Currencies', () => {
    it('are listed correctly', () => {
        expect(currencies).toEqual({
            USD: "USD",
            EUR: "EUR",
            GBP: "GBP",
        })
    })
})
