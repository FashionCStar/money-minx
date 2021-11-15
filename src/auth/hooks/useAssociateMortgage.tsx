import useFetch from 'common/hooks/useFetch';
import { getAssociateMortgage } from 'api/request.api';

const useAssociateMortgage = () => {
  const { res, loading } = useFetch(getAssociateMortgage, {});
  return { fetchingMortgage: loading, mortgageAccounts: res?.data as string[], mortgageError: res?.error };
};

export default useAssociateMortgage;
