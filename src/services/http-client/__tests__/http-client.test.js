import httpClient from "../http-client.js";

describe("httpClient service", () => {
    it("doesn`t make request", () => {
        // requester is not a fn; url is string; options is object
        expect(() => {
            httpClient("not-a-function", {url: "is-string", options: {}});
        }).toThrowError(new Error("Invalid HTTP configuration"));

        // requester is fn; url is not a string; options is object
        expect(() => {
            httpClient(() => ({}), {url: null, options: {}});
        }).toThrowError(new Error("Invalid HTTP configuration"));

        // requester is fn; url is a string; options is not an object
        expect(() => {
            httpClient(() => ({}), {url: "is-string", options: null});
        }).toThrowError(new Error("Invalid HTTP configuration"));
    });

    it("makes request", () => {
        const testResult = "testResult";

        const requester = jest.fn(() => testResult);

        expect(
            httpClient(requester, {url: "test-url", options: {test: "options"}})
        ).toEqual(testResult);
    });
});
