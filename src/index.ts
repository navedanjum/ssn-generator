const getCenturianDigit = (year = 2022) => {
  if (year < 1858) return -1;

  if (year > 2057) return -1;

  if (year < 1900) return getRandomIntBetween(5, 9);

  if (year <= 1999) {
    if (year < 1937) return getRandomIntBetween(0, 4);
    if (year >= 1937) {
      const possibleDigits = [0, 1, 2, 3, 4, 9];
      return possibleDigits[getRandomIntBetween(0, 6)];
    }
  }

  if (year <= 2057) {
    if (year <= 2036) return getRandomIntBetween(4, 10);
    if (year > 2036) return getRandomIntBetween(5, 9);
  }

  return -1;
};

const getRandomIntBetween = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateSSN = (dd: number, mm: number, yyyy: number): string => {
  const controlDigits = [4, 3, 2, 7, 6, 5, 4, 3, 2];
  const formattedDob = String(dd) + String(mm) + String(yyyy).substring(2);
  let cpr = '';
  let sum = 0;

  // eslint-disable-next-line no-constant-condition
  while (1) {
    cpr = '';
    const centurianDigit = getCenturianDigit(yyyy);

    if (centurianDigit === -1) {
      console.log('CPR specification does not exist for the given birth year');
      throw new Error();
    }

    cpr += formattedDob.concat(centurianDigit.toString());

    for (let i = 0; i < 2; i++) cpr += getRandomIntBetween(0, 10);

    //Equation: 4x1 + 3x2 + 2x3 + 7x4 + 6x5 + 5x6 + 4x7 + 3x8 + 2x9 + x10 ≡ 0 (mod 11)
    //Where x1..x10 are ten digits of CPR
    //Source: //en.wikipedia.org/wiki/Personal_identification_number_(Denmark)
    //https://da.wikipedia.org/w/index.php?title=CPR-nummer&oldid=9823102

    for (let i = 0; i < cpr.length; i++)
      sum += (Number(cpr.charAt(i)) - 48) * controlDigits[i];

    if (sum % 11 === 0 || sum % 11 === 1) continue;

    //Insert the hypen after modulo check
    cpr += 11 - (sum % 11);
    cpr = cpr.substring(0, 6) + '-' + cpr.substring(6, cpr.length);

    return cpr;
  }

  return cpr;
};
