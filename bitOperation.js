const checkNthBitIsSet = (x, n) => x & (1 << n);

const setNthBit = (x, n) => x | (1 << n);

const unsetNthBit = (x, n) => x & ~(1 << n);

const toggleNthBit = (x, n) => x ^ (1 << n);

const turnOffTheRightmost1Bit = x => x & (x - 1);

const isolateTheRightmost1Bit = x => x & (-x);

const rightPropagateTheRightmost1Bit = x => x | (x-1);

const isolateTheRightmost0Bit = x => ~x & (x+1)

const turnOnTheRightmost0Bit = x => x | (x+1)

const setNthBit64 = (x, n) => {
    // console.log(x,n)
    let hi = 0x80000000
    let lo = 0x7fffffff
    let high = ~~(x / hi);
    let low = x & lo;
    // console.log(`set -- high: ${high}, low: ${low}`);
    if (n > 31) {
        return setNthBit(high, n-31) * hi + low;
    } else if( n == 31) {
        if (high & 1 === 1) {
            return x;
        } else {
            return (hi * 1)+x;
        }
    } else {
        return high * hi + setNthBit(low, n);
    }
}

const unsetNthBit64 = (x, n) => {
    // console.log(x,n)
    let hi = 0x80000000
    let lo = 0x7fffffff
    let high = ~~(x / hi);
    let low = x & lo;
    // console.log(`unset -- high: ${high}, low: ${low}`);
    if (n > 31) {
        return unsetNthBit(high, n-31) * hi + low;
    } else if( n == 31) {
        if (high & 1 === 1) {
            return x - hi;
        } else {
            return x;
        }
    } else {
        return high * hi + unsetNthBit(low, n);
    }
}

module.exports = {
    checkNthBitIsSet,
    setNthBit,
    unsetNthBit,
    toggleNthBit,
    turnOffTheRightmost1Bit,
    isolateTheRightmost1Bit,
    rightPropagateTheRightmost1Bit,
    isolateTheRightmost0Bit,
    turnOnTheRightmost0Bit,
    setNthBit64,
    unsetNthBit64,
}
