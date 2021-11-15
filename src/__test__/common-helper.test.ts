import { makeTypes } from 'common/common-helper';

describe('Name of the group', () => {
  test.only('should return types ', () => {
    const key = 'SIGN_IN';
    const keySuccess = 'SIGN_IN_SUCCESS';
    const auth = makeTypes(key);
    expect(auth.SIGN_IN_SUCCESS).toBe(keySuccess);
  });
});
