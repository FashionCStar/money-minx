import { storage } from 'app/app.storage';
import { StorageKey } from 'app/app.types';

const oldToken = 'oldToken!232323';
const newToken = 'Newtoken342342';

const data = {
  user: {
    fullName: 'John',
    address: 'Alaska',
  },
  token: oldToken,
  roles: ['ADMIN', 'GUEST'],
  isSignedIn: true,
  isAuthenticated: true,
};
describe('App Storage Test', () => {
  beforeAll(() => {
    storage.set(StorageKey.AUTH, data);
  });

  test('should storage key value and get data  ', () => {
    const { data: retrievedData, error } = storage.get(StorageKey.AUTH);
    expect(error).toBe(null);
    expect(Array.isArray(retrievedData)).toBeFalsy();
    expect(retrievedData?.token).not.toBeFalsy();
    expect(retrievedData?.token).toBe(oldToken);
  });

  test('should replace the token ', () => {
    storage.changeAccessToken(newToken);
    const { data: retrievedData } = storage.get(StorageKey.AUTH);
    expect(retrievedData).not.toBeFalsy();
    expect(retrievedData?.token).toBe(newToken);
    expect(Array.isArray(retrievedData?.roles)).toBeTruthy();
  });

  test('should return isSigned', () => {
    const { data: retrievedData } = storage.get(StorageKey.AUTH);
    expect(retrievedData?.isSignedIn).toBe(true);
  });
});
