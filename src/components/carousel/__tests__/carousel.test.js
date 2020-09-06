import React from "react";
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

        expect(1).toEqual(1);
    });
});
