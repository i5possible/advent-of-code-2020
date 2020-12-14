const checkNthBitIsSet = (x, n) => x & (1 << n);

const setNthBit = (x, n) => x | (1 << n);

const unsetNthBit = (x, n) => x & ~(1 << n);

const toggleNthBit = (x, n) => x ^ (1 << n);

const turnOffTheRightmost1Bit = x => x & (x - 1);

const isolateTheRightmost1Bit = x => x & (-x);

const rightPropagateTheRightmost1Bit = x => x | (x-1);

const isolateTheRightmost0Bit = x => ~x & (x+1)

const turnOnTheRightmost0Bit = x => x | (x+1)

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
}
