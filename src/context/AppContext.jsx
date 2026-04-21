/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from 'react'
import appReducer, { initialState } from '../reducer/AppReducer'
import { fetchAppData } from '../services/api'
import {
  getActivitiesFromPayload,
  getActivityStats,
} from '../utils/activityUtils'

export const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { totalActivities, goalAchievedCount, goalNotAchievedCount } =
    getActivityStats(state.activities)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const data = await fetchAppData()
        if (!isMounted) return
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: getActivitiesFromPayload(data),
        })
      } catch (error) {
        if (!isMounted) return
        dispatch({
          type: 'FETCH_ERROR',
          payload: error?.message || 'Failed to load data',
        })
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.appState = {
        totalActivities,
        goalAchievedCount,
        goalNotAchievedCount,
      }
    }
  }, [goalAchievedCount, goalNotAchievedCount, totalActivities])

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
