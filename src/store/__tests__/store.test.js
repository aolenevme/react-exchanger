import store from "../store.js";
import currencies from "../../lib/consts/currencies/currencies.js";

describe("Store", () => {
    it("is in a correct initial state", () => {
        expect(store).toEqual({
            exchangeAmount: 12,
            rates: {
                target: 1.457,
                selected: 1.457
            },
            selectedCurrency: currencies.USD.abbreviation,
            targetCurrency: currencies.GBP.abbreviation,
            wallets: {
                [currencies.USD.abbreviation]: 53.45,
                [currencies.EUR.abbreviation]: 100,
                [currencies.GBP.abbreviation]: 80.15
            }
        });
    });
});
