import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import config from '../../.firebaseConfig';

const FirebaseContext = createContext<{ firebaseApp: FirebaseApp | null }>({
  firebaseApp: null,
});

const FirebaseProvider = ({ children }: { children?: ReactNode }) => {
  const app = initializeApp(config);
  useEffect(() => {
    getAnalytics(app);
  }, []);
  return (
    <FirebaseContext.Provider
      value={useMemo(
        () => ({
          firebaseApp: app,
        }),
        [app],
      )}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
