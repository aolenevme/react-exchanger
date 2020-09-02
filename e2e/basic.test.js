const assert = require("assert");

describe("https://order.leroymerlin.ru", () => {
    it("should have the right title", async () => {
        await browser.url("https://order.leroymerlin.ru");

        const title = await browser.getTitle();

        assert.strictEqual(
            title,
            "Статус заказа – Леруа Мерлен"
        );
    });
});
