import * as React from "react";
import renderer from "react-test-renderer";
import constant from "lodash/constant.js";

import Carousel from "../carousel.js";
import Input from "../../input/input.js";

describe("<Carousel />", () => {
    const pockets = [{
        currency: "USD",
        input: constant(<Input prefix={constant("-")} value={145.67} />),
        balance: "You have 58.33$",
        rate: "£1 = $1.45"
    }, {
        currency: "EUR",
        input: constant(<Input prefix={constant("-")} value={145.67} />),
        balance: "You have 58.33$",
        rate: "£1 = $1.45"
    }, {
        currency: "GBP",
        input: constant(<Input prefix={constant("-")} value={145.67} />),
        balance: "You have 58.33$",
        rate: "£1 = $1.45"
    }];

    describe("rendering", () => {
        it("is rendered correctly", () => {
            expect(renderer
                .create(<Carousel pockets={pockets} />)
                .toJSON()).toMatchSnapshot();
            expect(renderer
                .create(<Carousel />)
                .toJSON()).toMatchSnapshot();
        });
    });

    describe.skip("scrolling", () => {
        it("scrolls to the right", () => {
            const currentPocketIdx = 1;
            const startX = 1;
            const endX = 1;
            const scrollIntoView = jest.fn();

            React.useState = jest
                .fn()
                .mockReturnValue("default")
                .mockReturnValueOnce([currentPocketIdx, jest.fn(() => currentPocketIdx + 1)])
                .mockReturnValueOnce([startX, jest.fn()])
                .mockReturnValueOnce([endX, jest.fn()]);

            React.useRef = jest.fn().mockReturnValue({current: {children: [{}, {}, {scrollIntoView}]}});

            renderer
                .create(<Carousel pockets={pockets} />);

            expect(scrollIntoView).toHaveBeenCalledWith({block: "start", inline: "nearest", behavior: "smooth"});
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
});
