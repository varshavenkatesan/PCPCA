const toNumber = (value) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

const normalizeText = (value) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export const getActivitiesFromPayload = (payload) => {
  const candidates = [
    payload,
    payload?.data,
    payload?.data?.data,
    payload?.payload,
  ]

  const match = candidates.find((entry) => Array.isArray(entry?.activities))
  return Array.isArray(match?.activities) ? match.activities : []
}

export const getActivityId = (activity) =>
  activity?.activityId ?? activity?.id ?? activity?._id ?? null

export const getActivitySteps = (activity) => toNumber(activity?.steps)

export const getCaloriesBurned = (activity) => toNumber(activity?.caloriesBurned)

export const getWorkoutMinutes = (activity) => toNumber(activity?.workoutMinutes)

export const hasBooleanGoalAchieved = (activity) =>
  typeof activity?.goalAchieved === 'boolean'

export const getActivityName = (activity) => {
  const name = normalizeText(activity?.name)
  return name || 'Unknown'
}

export const getActivityDate = (activity) => {
  const date = normalizeText(activity?.date)
  return date || 'No Date'
}

export const isValidActivity = (activity) => {
  if (!activity || typeof activity !== 'object') {
    return false
  }

  const steps = getActivitySteps(activity)
  const caloriesBurned = getCaloriesBurned(activity)
  const workoutMinutes = getWorkoutMinutes(activity)

  return (
    steps !== null &&
    steps > 0 &&
    caloriesBurned !== null &&
    caloriesBurned > 0 &&
    workoutMinutes !== null &&
    workoutMinutes > 0 &&
    hasBooleanGoalAchieved(activity)
  )
}

export const getValidActivities = (activities) =>
  activities.filter((activity) => isValidActivity(activity))

export const calculateEfficiency = (activity) => {
  const caloriesBurned = getCaloriesBurned(activity)
  const workoutMinutes = getWorkoutMinutes(activity)

  if (caloriesBurned === null || workoutMinutes === null || workoutMinutes <= 0) {
    return null
  }

  return caloriesBurned / workoutMinutes
}

export const getActivityStats = (activities) =>
  getValidActivities(activities).reduce(
    (stats, activity) => {
      stats.totalActivities += 1

      if (activity.goalAchieved === true) {
        stats.goalAchievedCount += 1
      }

      if (activity.goalAchieved === false) {
        stats.goalNotAchievedCount += 1
      }

      return stats
    },
    {
      totalActivities: 0,
      goalAchievedCount: 0,
      goalNotAchievedCount: 0,
    },
  )
