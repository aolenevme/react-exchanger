import currencies from "../currencies.js";

describe('Currencies', () => {
    it('are listed correctly', () => {
        expect(currencies).toEqual({
            USD: {
                symbol: "$",
                abbreviation: "USD"
            },
            EUR: {
                symbol: "€",
                abbreviation: "EUR"
            },
            GBP: {
                symbol: "£",
                abbreviation: "GBP"
            },
        })
    })
})
