export enum HouseHoldIncomeOptions {
  'OPT_1' = '0 - 50,000',
  'OPT_2' = '51,000 - 100,000',
  'OPT_3' = '101,000 - 200,000',
  'OPT_4' = '201,000 - 400,000',
  'OPT_5' = 'Over 401,000',
}

export enum MaritalStatusOptions {
  SINGLE = 'Single',
  MARRIED = 'Married',
  PARTNERED = 'Partnered',
  DIVORCED = 'Divorced',
  DISPARTNERED = 'Dispartnered',
  WIDOWED = 'Widowed',
}

export enum RiskToleranceOptions {
  HIGHEST_SAFETY = 'Highest Safety',
  CONSERVATIVE = 'Conservative',
  MODERATE = 'Moderate',
  AGGRESSIVE = 'Aggressive',
  HIGHEST_GROWTH = 'Highest Growth',
}

export enum StripeSubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}
