export function isValidActivity(activity) {
  return (
    activity &&
    typeof activity === 'object' &&
    Number(activity.steps) > 0 &&
    Number(activity.caloriesBurned) > 0 &&
    Number(activity.workoutMinutes) > 0 &&
    typeof activity.goalAchieved === 'boolean'
  );
}

export function normalizeActivity(activity) {
  return {
    ...activity,
    name: activity?.name || 'Unknown',
    date: activity?.date || 'No Date',
  };
}

export function findActivityById(activities, id) {
  return activities.find((activity) => String(activity?.activityId) === String(id));
}

export function getEfficiency(caloriesBurned, workoutMinutes) {
  const minutes = Number(workoutMinutes);
  const calories = Number(caloriesBurned);

  if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(calories)) {
    return 0;
  }

  return calories / minutes;
}
