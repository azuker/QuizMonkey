exports.convertFractionToPercentageString = function (number) {
    if (typeof number !== 'undefined') {
        return `${Math.round(number * 100)}%`;
    }
    return undefined;
}