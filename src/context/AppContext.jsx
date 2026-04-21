import { createContext, useContext, useEffect, useReducer } from 'react';
import { getPrivateData, getToken } from '../services/api';
import { appReducer, initialState } from '../reducer/AppReducer';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const fetchOnLoad = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: '' });

      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Token missing from /public/token response');
        }

        const data = await getPrivateData(token);

        if (!isMounted) {
          return;
        }

        dispatch({ type: 'SET_TOKEN', payload: token });
        dispatch({ type: 'SET_DATA', payload: Array.isArray(data) ? data : [] });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        dispatch({
          type: 'SET_ERROR',
          payload: error?.response?.data?.message || error.message || 'Request failed',
        });
      } finally {
        if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    fetchOnLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
