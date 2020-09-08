import * as React from "react";
import renderer from "react-test-renderer";
import constant from "lodash/constant.js";

import Carousel from "../carousel.js";
import Input from "../../input/input.js";
import * as scrollToPocket from "../scroll-to-pocket.js";

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

    describe("scrolling", () => {
        it("scrolls to the right", () => {
            const startX = 1;
            const endX = 1;

            scrollToPocket.default = jest.fn();

            React.useState = jest
                .fn()
                .mockReturnValue("default")
                .mockReturnValueOnce([startX, jest.fn()])
                .mockReturnValueOnce([endX, jest.fn()]);

            renderer
                .create(<Carousel activeCurrency={pockets[0].currency} pockets={pockets} />);

            expect(scrollToPocket.default).toHaveBeenCalled();
        });
    });
});
