import { Link } from 'react-router-dom'
import {
  getActivityDate,
  getActivityId,
  getActivityName,
} from '../utils/activityUtils'

const ActivityCard = ({ activity, onToggleGoal }) => {
  const activityId = getActivityId(activity)
  const name = getActivityName(activity)
  const date = getActivityDate(activity)

  return (
    <article data-testid="activity-item">
      <div>
        <h2>{name}</h2>
        <p>{activity.goalAchieved ? 'Goal achieved' : 'Goal not achieved'}</p>
      </div>
      <p>Activity ID: {activityId ?? 'N/A'}</p>
      <p>Steps: {activity?.steps ?? 'N/A'}</p>
      <p>Calories Burned: {activity?.caloriesBurned ?? 'N/A'}</p>
      <p>Workout Minutes: {activity?.workoutMinutes ?? 'N/A'}</p>
      <p>Date: {date}</p>
      <div>
        {activityId !== null ? (
          <Link to={`/activities/${activityId}`}>
            View details
          </Link>
        ) : null}
        {onToggleGoal ? (
          <button type="button" onClick={() => onToggleGoal(activityId)}>
            Toggle goal
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default ActivityCard
