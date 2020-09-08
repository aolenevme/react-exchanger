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

    // 0. Probably, have to pass into pocketsInfo

    // 0*. Probably, has to check pocketsInfo for valid fields

    // eslint-disable-next-line max-len
    // 1. Set currentPocketIdx = 1 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
    // eslint-disable-next-line max-len
    // === jest.fn was called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

    // eslint-disable-next-line max-len
    // 2. Set currentPocketIdx = 1 -> endX = 2 -> startX = 3, check that carouselElement.current.children[currentPocketIdx - 1].scrollIntoView
    // eslint-disable-next-line max-len
    // === jest.fn was called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

    // eslint-disable-next-line max-len
    // 3. Set currentPocketIdx = 2 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
    // eslint-disable-next-line max-len
    // === jest.fn WAS NOT called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

    // eslint-disable-next-line max-len
    // 4. Set currentPocketIdx = 0 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
    // eslint-disable-next-line max-len
    // === jest.fn WAS NOT called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.
});
