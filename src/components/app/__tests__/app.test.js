import React from "react";
import ShallowRenderer from "react-test-renderer/shallow.js";

import App from "../app.js";

describe("<App />", () => {
    it("is rendered correctly", () => {
        const renderer = new ShallowRenderer();

        renderer.render(<App />);

        expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
});
