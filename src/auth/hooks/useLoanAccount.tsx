import useFetch from 'common/hooks/useFetch';
import { getLoanAccounts } from 'api/request.api';

const useLoanAccount = () => {
  const { res, loading } = useFetch(getLoanAccounts, {});
  return { fetchingLoanAccount: loading, loanAccounts: res?.data as string[], loanAccountError: res?.error };
};

export default useLoanAccount;
