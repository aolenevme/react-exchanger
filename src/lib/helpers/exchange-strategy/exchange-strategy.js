const PRECISION = 2;

function exchangeStrategy(amount, rate) {
    const targetInputValue = Number(amount) * Number(rate);

    return amount === ""
        ? amount
        : targetInputValue.toFixed(PRECISION);
}

export {PRECISION};

export default exchangeStrategy;
