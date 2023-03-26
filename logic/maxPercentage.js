const maxPercentage = (fraction, calculateMax) => {
    let attended = Number(fraction.split('/')[0])
    calculateMax ? attended += 10 : attended
    let total = Number(fraction.split('/')[1])
    total += 10
    return (Math.round((attended/total) * 100))
}

module.exports = maxPercentage