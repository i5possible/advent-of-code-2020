const { readData } = require('./readfile');
const bitOperation = require('./bitOperation');
// const input = readData('day14Input-simple.txt');
const input = readData('day14Input.txt');
const lines = input.split(/\n/).map(line => line.split(" = "));

const operations = {};

const maskNumber1 = (number, mask) => bitOperation.setNthBit64(number, mask);

const maskNumber0 = (number, mask) => bitOperation.unsetNthBit64(number, mask);

const maskNumber1And0 = (number, mask1, mask0) => {
    let res = number;
    for (let i = 0; i < mask1.length; i++) {
        res = maskNumber1(res, mask1[i]);
    }
    for (let i = 0; i < mask0.length; i++) {
        res = maskNumber0(res, mask0[i]);
    }
    return res;
}

const maskNumber1s = (number, mask1) => {
    let res = number;
    for (let i = 0; i < mask1.length; i++) {
        res = maskNumber1(res, mask1[i]);
    }
    return res;
}

const sumMasked = lines => {
    let mask1, mask0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line[0] === "mask") {
            let m = line[1];
            mask1 = [];
            mask0 = [];
            for (let j = 0; j < m.length; j++) {
                if(m[j] === '1') {
                    mask1.push(m.length-j-1);
                } else if(m[j] === '0') {
                    mask0.push(m.length-j-1);
                }
            }
            // console.log(mask1, mask0);
            continue;
        }
        const value = parseInt(line[1])
        const index = /\[(.+)\]/g.exec(line[0])[1];
        const masked = maskNumber1And0(value, mask1, mask0);
        // console.log("mem", index, value, masked);
        if(masked < 0) {
            // console.log(line[1], mask1, mask0, masked)
        }
        operations[`s${index}`] = masked;
    }

    const res = Object.values(operations).reduce((acc, cur) => acc + cur, 0)
    return res;
}
// console.log(t);
// t = bitOperation.setNthBit64(483, 31);
// console.log(t);
// t = bitOperation.setNthBit64(483, 32);
// console.log(t);

// t = bitOperation.unsetNthBit64(4294967779, 32);
// console.log(t);
// t = bitOperation.unsetNthBit64(2147484131, 31);
// console.log(t);
// t = bitOperation.unsetNthBit64(1073742307, 30);
// console.log(t);

// let masked1 = bitOperation.setNthBit64(474293, 33);
// console.log(masked1);
// let masked2 = bitOperation.unsetNthBit64(masked1, 28);
// console.log(masked2);

// const testUnset = (x, n) => {
//     let res = bitOperation.unsetNthBit64(x, n);
//     console.log(res)
// }

// 0x8fffffff = 2415919103;
// testUnset(2415919103, 27);
// testUnset(2415919103, 28);
// testUnset(2415919103, 29);
// testUnset(2415919103, 30);
// testUnset(2415919103, 31);
// testUnset(2415919103, 32);
// testUnset(2415919103, 33);

// 7728987414911

// mask1 = [
//   31, 30, 29, 26, 25, 24,
//   21, 12, 11,  9,  8,  5,
//    1,  0
// ] 
// mask0 = [
//   34, 33, 32, 28, 27, 23, 20,
//   19, 18, 17, 16, 14, 13, 10,
//    4,  3,  2
// ]
// num = 4114776
// mask1 = [
//   35, 34, 32, 31, 29, 27,
//   23, 20, 14, 13,  8,  5,
//    2
// ] 
// mask0 = [
//   33, 28, 26, 22, 21, 19, 18,
//   16, 15, 12, 11, 10,  6,  4,
//    3,  1,  0
// ]
// num = 356438366
// maskNumber1And0(num, mask1, mask0)

// console.log(sumMasked(lines));

const getAddresses = (address, masks) => {
    let addresses = [address];
    // console.log(`maskX's number: ${masks.length}`);
    for (let i = 0; i < masks.length; i++) {
        const len = addresses.length;
        for (let j = 0; j < len; j++) {
            const cur = addresses.shift();
            addresses.push(maskNumber0(cur, masks[i]));
            addresses.push(maskNumber1(cur, masks[i]));
        }
    }
    return addresses;
}

const sumDecoded = lines => {
    let mask1, maskX;
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line[0] === "mask") {
            let m = line[1];
            mask1 = [];
            maskX = [];
            for (let j = 0; j < m.length; j++) {
                if(m[j] === '1') {
                    mask1.push(m.length-j-1);
                } else if(m[j] === 'X') {
                    maskX.push(m.length-j-1);
                }
            }
            // console.log(mask1, maskX);
            continue;
        }
        const value = parseInt(line[1])
        const index = parseInt(/\[(.+)\]/g.exec(line[0])[1]);
        const maskedAddress = maskNumber1s(index, mask1);
        const addresses = getAddresses(maskedAddress, maskX);
        // console.log("mem", value, index, maskedAddress, addresses);
        // console.log(value, addresses.length, maskX.length)
        // sum += addresses.length * value;
        addresses.forEach(address => {
            operations[address] = value;
        })
    }
    // console.log(sum);

    // console.log(JSON.stringify(Object.values(operations)))
    const res = Object.values(operations).reduce((acc, cur) => acc + cur, 0)
    console.log(res);
    return res;
}

sumDecoded(lines)