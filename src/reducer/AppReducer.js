export const initialState = {
  token: '',
  data: [],
  loading: false,
  error: '',
};

function isValidActivity(activity) {
  return (
    activity &&
    typeof activity === 'object' &&
    Number(activity.steps) > 0 &&
    Number(activity.caloriesBurned) > 0 &&
    Number(activity.workoutMinutes) > 0 &&
    typeof activity.goalAchieved === 'boolean'
  );
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'TOGGLE_GOAL': {
      const targetId = action.payload;
      let hasChanged = false;

      const updatedData = state.data.map((activity) => {
        if (!activity || String(activity.activityId) !== String(targetId)) {
          return activity;
        }

        if (!isValidActivity(activity)) {
          return activity;
        }

        const forcedGoal = Number(activity.steps) >= 8000;
        const nextGoalAchieved = forcedGoal ? true : !activity.goalAchieved;

        if (activity.goalAchieved === nextGoalAchieved) {
          return activity;
        }

        hasChanged = true;
        return {
          ...activity,
          goalAchieved: nextGoalAchieved,
        };
      });

      if (!hasChanged) {
        return state;
      }

      return {
        ...state,
        data: updatedData,
      };
    }
    default:
      return state;
  }
}
