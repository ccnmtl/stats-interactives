export const generatePopulation = () => {
    let len = 6;
    let min = -4;
    let max = 4;

    let scale = max - min;
    let offset = min;
    return [...Array(len)].map(() => {
        return [(Math.random() * scale) + offset,
        (Math.random() * scale) + offset];
    });
};

export const validatePopulation = (population, alpha, beta, optimalSSE) => {
    // Population Constraints
    const minSSE = 3;
    const maxSSE = 15;
    const minSlope = -5;
    const maxSlope = 5;
    const minIntercept = -4;
    const maxIntercept = 4;

    if (minSlope <= beta && beta <= maxSlope &&
        minIntercept <= alpha && alpha <= maxIntercept &&
        minSSE <= optimalSSE && optimalSSE <= maxSSE) {
        return true;
    }
    return false;
};
