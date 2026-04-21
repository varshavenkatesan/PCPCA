import {
  getActivityId,
  getActivitySteps,
  isValidActivity,
} from '../utils/activityUtils'

export const initialState = {
  activities: [],
  loading: false,
  error: null,
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, activities: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'TOGGLE_GOAL_ACHIEVED': {
      if (!Array.isArray(state.activities) || state.activities.length === 0) {
        return state
      }

      const targetId = action.payload
      let hasUpdates = false
      const updatedActivities = state.activities.map((activity) => {
        const activityId = getActivityId(activity)
        if (String(activityId) !== String(targetId)) {
          return activity
        }

        if (!isValidActivity(activity)) {
          return activity
        }

        const activitySteps = getActivitySteps(activity) ?? 0
        const nextGoalAchieved =
          activitySteps >= 8000 ? true : !activity.goalAchieved

        if (nextGoalAchieved === activity.goalAchieved) {
          return activity
        }

        hasUpdates = true
        return {
          ...activity,
          goalAchieved: nextGoalAchieved,
        }
      })

      if (!hasUpdates) {
        return state
      }

      return {
        ...state,
        activities: updatedActivities,
      }
    }
    default:
      return state
  }
}

export default appReducer
