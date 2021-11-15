import { getStringDate } from 'common/moment.helper';

describe('Moment helper', () => {
  test.only('Get Full string date', () => {
    const expected = 'Sep 28, 2020';
    const today = new Date('2020-09-28');

    expect(getStringDate(today)).toBe(expected);
  });
});
