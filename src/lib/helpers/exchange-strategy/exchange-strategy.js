function exchangeStrategy(amount, rate) {
    const targetInputValue = Number(amount) * Number(rate);
    const PRECISION = 2;

    return amount === ""
        ? amount
        : targetInputValue.toFixed(PRECISION);
}

export default exchangeStrategy;
