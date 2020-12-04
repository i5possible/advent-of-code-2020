const { readData } = require('./readfile');

// const input = readData('day4Input2.txt');
// 156

const input = readData('day4Input.txt');
const lines = input.split(/\s\n/);

/*
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
*/

const getAllFieldsPresentPassports = (lines) => {
    const passportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    // question 1
    const validPassports = lines.map(line => line.split(/\s/).map(s => s.split(':')[0]))
        .map(lineValues => passportFields.map(filed => lineValues.includes(filed)).reduce((acc, cur) => acc && cur, true))
        .filter(Boolean)
    console.log(validPassports.length)
    // 239
    return validPassports;
}

// question 2
/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/

const checkNumber = (input, min, max, len) => {
    return input >= min && input <= max && input.toString().length === len;
}

const checkWithUnit = (input, units) => {
    const [, value, unit] = input.match(/(\d*)([^\d]*)/);
    if (!unit) {
        return false;
    }
    const { min, max } = units[unit];
    return value >= min && value <= max;
}

const checkHexColor = input => {
    return /#[0-9a-f]{6,6}/.test(input);
}

const checkEyeColor = input => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(input);
}

// need to exact 9 digit. so from start to end.
const checkPassportId = input => {
    return /^[0-9]{9,9}$/.test(input);
}

const passportFields = {
    'byr': input => checkNumber(input, 1920, 2002, 4),
    'iyr': input => checkNumber(input, 2010, 2020, 4),
    'eyr': input => checkNumber(input, 2020, 2030, 4),
    'hgt': input => checkWithUnit(input, {
        'cm': {
            min: 150,
            max: 193,
        }, 'in': {
            min: 59,
            max: 76,
        }
    }),
    'hcl': checkHexColor,
    'ecl': checkEyeColor,
    'pid': checkPassportId,
}

const checkAllPresent = lineValues => Object.keys(passportFields).every(filed => lineValues.map(v => v[0]).includes(filed));

const checkAllValid = lineValues => lineValues.every(passport => {
    // if (!Object.keys(passportFields).includes(passport[0])) {
    //     return true;
    // }
    if ('cid' === passport[0]) {
        return true;
    }
    const validator = passportFields[passport[0]];
    if (typeof (validator) === 'function') {
        return validator(passport[1]);
    } else {
        return false;
    }
});


const getAllValidPassports = (lines) => lines.map(line => line.split(/\s/).map(s => s.split(':')))
    .map(lineValues => checkAllPresent(lineValues) && checkAllValid(lineValues))
    .filter(Boolean);


// getAllValidPassports(lines);
console.log(getAllValidPassports(lines).length)

// const checkHeight = height => checkWithUnit(height, {
//     'cm': {
//         min: 150,
//         max: 193,
//     }, 'in': {
//         min: 59,
//         max: 76,
//     }
// })
// console.log(['149cm', '150cm', '175cm', '193cm', '200cm', '58in', '59in', '62in', '76in', '100in', '100'].map(checkHeight))