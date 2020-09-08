import constant from "lodash/constant.js";

import scrollToPocket from "../scroll-to-pocket.js";

describe("Scroll to pocket", () => {
    it("scrolls", () => {
        const testCarouselElement = {current: {children: [{scrollIntoView: jest.fn()}]}};
        const setActiveCurrency = jest.fn();
        const getNextPocketIdx = jest.fn(constant(0));
        const testPockets = [{currency: "USD"}];

        scrollToPocket(getNextPocketIdx, setActiveCurrency, testCarouselElement, testPockets);

        expect(setActiveCurrency).toHaveBeenCalledWith(testPockets[0].currency);
        // eslint-disable-next-line max-len
        expect(testCarouselElement.current.children[0].scrollIntoView).toHaveBeenCalledWith({block: "start", inline: "nearest", behavior: "smooth"});
    });
});
