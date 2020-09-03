export default ratio =>
    ratio
        ? (+ratio)
            .toFixed(4)
            .split('.')
            .flatMap((splitStr, index) =>
                index === 0 ? [splitStr] : [splitStr.substring(0, 2), splitStr.substring(2, 4)]
            )
        : [];
