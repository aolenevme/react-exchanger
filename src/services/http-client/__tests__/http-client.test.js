import httpClient from "../http-client.js";

describe("httpClient service", () => {
    it("doesn`t make request", () => {
        // requester is not a fn; options are string; options is object
        expect(() => {
            httpClient("not-a-function", "i-m-not-object");
        }).toThrowError(new Error("Invalid HTTP configuration"));
    });

    it("makes request", () => {
        const testResult = "testResult";

        const requester = jest.fn(() => testResult);

        expect(
            httpClient(requester, {url: "test-url", headers: {"test-header": "*"}})
        ).toEqual(testResult);
    });
});
