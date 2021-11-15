import { serialize } from 'common/common-helper';
import { groupByProviderName, makeFormFields } from 'auth/auth.helper';
import { rawProfileData, groupedProfileData } from '__mocks__/profile-group.mock';

describe('Auth Helper test', () => {
  test('should return group by provider name ', () => {
    const res = groupByProviderName(rawProfileData);
    expect(serialize(res)).toBe(serialize(groupedProfileData));
  });

  test.only('Should return correct form fields', () => {
    const filters = ['returns', 'liquidity'];
    const final = [
      'accountName',
      'mmCategory',
      'mmAccountType',
      'mmAccountSubType',
      'currency',
      'calculateReturns',
      'estimatedAnnualReturns',
      'liquidity',
    ];
    const formFields = makeFormFields(filters);
    expect(serialize(formFields)).toBe(serialize(final));
  });
});
