import currencies from "../../lib/consts/currencies/currencies.js";
import store from "../store.js";

describe("Store", () => {
    it("is in a correct initial state", () => {
        expect(store).toEqual({
            exchangeAmount: "",
            rates: {
                target: "",
                selected: ""
            },
            selectedCurrency: currencies.USD.abbreviation,
            targetCurrency: currencies.GBP.abbreviation,
            balances: {
                [currencies.USD.abbreviation]: 53.45,
                [currencies.EUR.abbreviation]: 100,
                [currencies.GBP.abbreviation]: 80.15
            }
        });
    });
});
