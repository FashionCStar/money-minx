import { useParams } from 'react-router-dom';

const useParam = () => {
  return useParams() as any;
};

export default useParam;
