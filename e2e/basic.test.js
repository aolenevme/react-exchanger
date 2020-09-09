const assert = require("assert");

describe("https://github.com/", () => {
    it("should have the right title", async () => {
        await browser.url("https://github.com/");

        const title = await browser.getTitle();

        assert.strictEqual(
            title,
            "The world’s leading software development platform · GitHub"
        );
    });
});
