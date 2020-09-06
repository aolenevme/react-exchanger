import store from "../store.js";
import currencies from "../../lib/consts/currencies/currencies.js";

describe("Store", () => {
    it("is in a correct initial state", () => {
        expect(store).toEqual({
            selectedCurrency: currencies.USD.abbreviation,
            targetCurrency: currencies.GBP.abbreviation,
            exchangeAmount: "",
            wallets: {
                [currencies.USD.abbreviation]: 53.45,
                [currencies.EUR.abbreviation]: 100,
                [currencies.GBP.abbreviation]: 80.15
            }
        });
    });
});
