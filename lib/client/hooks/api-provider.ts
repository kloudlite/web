import { useContext, createContext } from 'react';
// @ts-ignore
import { createRPCClient } from '@madhouselabs/madrpc';
import { LibApiType } from '../../server/gql/saved-queries';

export const APIContext = createContext(createRPCClient('/api'));

export const useAPIClient = () => useContext(APIContext);
export const useAuthApi: () => LibApiType = useAPIClient;

// export const useApiCall = ({ fn, data }: any) => {
//   const [_data, setData] = useState();
//   const [error, setError] = useState<string>();
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     (async () => {
//       setIsLoading(true);
//       try {
//         const { data: __data, errors } = await fn();
//         if (errors) {
//           throw errors[0];
//         }
//         setData(__data);
//       } catch (err) {
//         setError(parseError(err).message);
//         console.log(err);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [data]);
//   return { data: _data, error, isLoading };
// };
