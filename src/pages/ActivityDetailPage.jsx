import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {
  calculateEfficiency,
  getActivityDate,
  getActivityId,
  getActivityName,
} from '../utils/activityUtils'

const ActivityDetailPage = () => {
  const { id } = useParams()
  const { activities, loading, error } = useContext(AppContext)

  const activity = activities.find(
    (entry) => String(getActivityId(entry)) === String(id),
  )

  if (loading) {
    return (
      <section>
        <p>Loading activities...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    )
  }

  if (!id || !activity) {
    return (
      <section>
        <p>Activity not found</p>
      </section>
    )
  }

  const efficiency = calculateEfficiency(activity)

  return (
    <section>
      <header>
        <div>
          <p>Activity Detail</p>
          <h1>{getActivityName(activity)}</h1>
        </div>
      </header>

      <div>
        <div>
          <p>Activity ID: {getActivityId(activity) ?? 'N/A'}</p>
          <p>Steps: {activity?.steps ?? 'N/A'}</p>
          <p>Calories Burned: {activity?.caloriesBurned ?? 'N/A'}</p>
          <p>Workout Minutes: {activity?.workoutMinutes ?? 'N/A'}</p>
          <p>
            Goal Achieved:{' '}
            {typeof activity?.goalAchieved === 'boolean'
              ? String(activity.goalAchieved)
              : 'Invalid value'}
          </p>
          <p>Date: {getActivityDate(activity)}</p>
          <p>Efficiency Score: {efficiency === null ? 'N/A' : efficiency.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}

export default ActivityDetailPage
