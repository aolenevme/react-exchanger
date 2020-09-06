// eslint-disable-next-line import/no-namespace
import * as React from "react";
import renderer from "react-test-renderer";

import Carousel from "../carousel.js";

describe("<Carousel />", () => {
    describe("rendering", () => {
        it("is rendered correctly", () => {
            expect(renderer
                .create(<Carousel />)
                .toJSON()).toMatchSnapshot();
        });
    });

    describe("scrolling", () => {
        it("scrolls to the right", () => {
            const currentPocketIdx = 1;
            const startX = 1;
            const endX = 1;
            const scrollIntoView = jest.fn();

            // eslint-disable-next-line fp/no-mutation,no-import-assign
            React.useState = jest
                .fn()
                .mockReturnValue("default")
                .mockReturnValueOnce([currentPocketIdx, jest.fn(() => currentPocketIdx + 1)])
                .mockReturnValueOnce([startX, jest.fn()])
                .mockReturnValueOnce([endX, jest.fn()]);

            // eslint-disable-next-line fp/no-mutation,no-import-assign
            React.useRef = jest.fn(() => [{current: {children: [{}, {}, {scrollIntoView}]}}]);

            expect(scrollIntoView).toHaveBeenCalledWith({block: "start", inline: "nearest", behavior: "smooth"});
        });

        // 0. Probably, have to pass into pocketsInfo

        // 0*. Probably, has to check pocketsInfo for valid fields

        // 1. Set currentPocketIdx = 1 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
        // === jest.fn was called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

        // 2. Set currentPocketIdx = 1 -> endX = 2 -> startX = 3, check that carouselElement.current.children[currentPocketIdx - 1].scrollIntoView
        // === jest.fn was called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

        // 3. Set currentPocketIdx = 2 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
        // === jest.fn WAS NOT called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.

        // 4. Set currentPocketIdx = 0 -> endX = 2 -> startX = 1, check that carouselElement.current.children[currentPocketIdx + 1].scrollIntoView
        // === jest.fn WAS NOT called with {block: "start", inline: "nearest", behavior: "smooth"}. And test Dots via snapshot tests.
    });
});
