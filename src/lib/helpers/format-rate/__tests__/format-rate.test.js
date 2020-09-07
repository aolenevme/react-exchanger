import formatRate from '../format-rate.js';

describe("Format rate", () => {
    it("formats rate correctly", () => {
        const currencySymbols = {
            selectedCurrencySymbol: "£",
            targetCurrencySymbol: "$"
        };

        expect(formatRate(1, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}1.00`);
        expect(formatRate(1.12, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}1.12`);
        expect(formatRate(1.123, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}1.1230`);
        expect(formatRate(1.4756, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}1.4756`)
        expect(formatRate(1.47566, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}1.4757`)
        expect(formatRate(100.1234, currencySymbols)).toEqual(`${currencySymbols.selectedCurrencySymbol}1 = ${currencySymbols.targetCurrencySymbol}100.1234`)
        expect(formatRate(0, currencySymbols)).toEqual("")
        expect(formatRate(-1, currencySymbols)).toEqual("")
    })
})
