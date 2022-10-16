import {generateSSN} from '../src';

describe('Generate valid 10 digit CPR numbers', () => {
  test('Should generate a valid CPR number 10 digit', () => {
    expect(generateSSN('20', '10', '2022')).toHaveLength(11);
  });

  test('Should generate a valid CPR for person born between 1857 and 1900', () => {
    expect(generateSSN('20', '10', '1890')).toHaveLength(11);
  });

  test('Should generate a valid CPR for person born after 1937 and before 2000', () => {
    expect(generateSSN('31', '12', '1950')).toHaveLength(11);
  });

  test('Should generate a valid CPR for person born after 2035 and before 2058', () => {
    expect(generateSSN('31', '12', '2050')).toHaveLength(11);
  });

  test('Should generate a valid CPR for person born between 1900 and 1937', () => {
    expect(generateSSN('05', '05', '1936')).toHaveLength(11);
  });

  test('Should have hypen as the 7 character', () => {
    const ssn = generateSSN('20', '10', '2022');
    expect(ssn.charAt(6)).toBe('-');
  });

  test('Should throw an error for year greater than 2057', () => {
    expect(() => generateSSN('10', '12', '2058')).toThrow(
      new Error('CPR specification does not exist for the given birth year')
    );
  });

  test('Should throw an error for year less than 1858', () => {
    expect(() => generateSSN('01', '12', '1850')).toThrow(
      new Error('CPR specification does not exist for the given birth year')
    );
  });
});
