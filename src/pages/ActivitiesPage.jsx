import { useContext } from 'react'
import ActivityCard from '../components/ActivityCard'
import { AppContext } from '../context/AppContext'
import { getActivityId, getValidActivities } from '../utils/activityUtils'

const ActivitiesPage = () => {
  const { activities, loading, error, dispatch } = useContext(AppContext)
  const validActivities = getValidActivities(activities)

  const handleToggleGoal = (activityId) => {
    if (activityId === null || activityId === undefined) {
      return
    }

    dispatch({ type: 'TOGGLE_GOAL_ACHIEVED', payload: activityId })
  }

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

  return (
    <section>
      <header>
        <div>
          <p>Question 1 and 4</p>
          <h1>Valid Activities</h1>
        </div>
      </header>

      {validActivities.length === 0 ? (
        <p>No valid activities available.</p>
      ) : (
        <div>
          {validActivities.map((activity) => (
            <ActivityCard
              key={getActivityId(activity)}
              activity={activity}
              onToggleGoal={handleToggleGoal}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ActivitiesPage
