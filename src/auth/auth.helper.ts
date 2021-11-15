import { groupBy } from 'lodash';
import { Account } from './auth.types';
import fieldData from './data/field.data.json';

export const groupByProviderName = (list: Account[], key: string = 'providerName') => {
  return groupBy(list, key);
};

export const makeFormFields = (filters: string[]) => {
  return filters.reduce<string[]>((acc, cur) => {
    const all = fieldData.all;
    const [found] = Object.keys(fieldData)
      .filter((key) => key === cur)
      .map((key) => (fieldData as any)[key]);

    acc = found ? [...all, ...acc, ...found] : [...all, ...acc];
    const formFields = [...new Set(acc)];
    return formFields;
  }, []);
};

export const isFieldExist = (field: string, fields: string[]) => fields.includes(field);
