import moment from 'moment';

export const getMonthYear = (inputDate?: any) => {
  if (inputDate !== undefined) {
    const year = moment(inputDate).format('yyyy');
    const month = moment(inputDate).format('MM');
    const nextMonthDate = new Date(parseInt(year, 10), parseInt(month, 10), 1);
    return moment(nextMonthDate).format('MMM YYYY');
  } else {
    return moment(inputDate).format('MMM YYYY');
  }
};

export const getRelativeDate = (inputDate: string) => moment(inputDate).fromNow();

export const getISOString = <T>(inputDate: T) => moment(inputDate).toISOString();

export const isAfter = <T, D>(inputDate: T, valDate?: D) => moment(inputDate).isAfter(valDate);

export const getDate = <T>(inputDate: T) => new Date(moment(inputDate).format('yyyy-MM-DD')).toISOString();

export const getQuarter = <T>(inputDate?: T) => moment(inputDate).format('[Q]Q yyyy');

export const getYear = <T>(inputDate?: T) => moment(inputDate).format('yyyy');

export const getStringDate = <T>(inputDate?: T) => moment(inputDate).format('MMM DD, yyyy');
