import constant from "lodash/constant.js";
import get from "lodash/get.js";

// eslint-disable-next-line max-params,max-len
function scrollToPocket(getNextPocketIdx = constant(0), setActiveCurrency = () => ({}), carouselElement = null, pockets = []) {
    try {
        const nextPocketIdx = getNextPocketIdx();
        const newActiveCurrency = get(pockets, `[${nextPocketIdx}].currency`, "");
        const pocketElement = get(carouselElement, `current.children[${nextPocketIdx}]`, () => ({}));

        setActiveCurrency(newActiveCurrency);
        pocketElement.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export default scrollToPocket;
