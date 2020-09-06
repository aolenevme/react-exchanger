import store from "../store.js";
import currencies from "../../lib/consts/currencies/currencies.js";

describe("Store", () => {
    it("is in a correct initial state", () => {
        expect(store).toEqual({
            selectedCurrency: currencies.USD,
            targetCurrency: currencies.GBP,
            exchangeAmount: "",
            wallets: {
                [currencies.USD]: 53.45,
                [currencies.EUR]: 100,
                [currencies.GBP]: 80.15
            }
        });
    });
});
