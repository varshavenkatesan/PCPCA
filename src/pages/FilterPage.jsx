import { useContext, useState } from 'react'
import ActivityCard from '../components/ActivityCard'
import { AppContext } from '../context/AppContext'
import { getActivityId, getValidActivities } from '../utils/activityUtils'

const FilterPage = () => {
  const { activities, loading, error } = useContext(AppContext)
  const [minimumSteps, setMinimumSteps] = useState('')

  const validActivities = getValidActivities(activities)
  const trimmedMinimumSteps = minimumSteps.trim()
  const parsedMinimumSteps = Number(trimmedMinimumSteps)
  const hasEmptyInput = trimmedMinimumSteps === ''
  const hasInvalidInput =
    !hasEmptyInput &&
    (!Number.isFinite(parsedMinimumSteps) || parsedMinimumSteps < 0)

  const filteredActivities = validActivities.filter((activity) =>
    !hasEmptyInput && !hasInvalidInput
      ? activity.steps >= parsedMinimumSteps
      : false,
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

  return (
    <section>
      <header>
        <div>
          <p>Question 3</p>
          <h1>Filter Activities</h1>
        </div>
      </header>

      <label htmlFor="minimumSteps">
        <span>Minimum steps</span>
        <input
          id="minimumSteps"
          type="number"
          value={minimumSteps}
          onChange={(event) => setMinimumSteps(event.target.value)}
          placeholder="Enter steps"
        />
      </label>

      {hasEmptyInput ? (
        <p>Please enter a minimum steps value.</p>
      ) : null}

      {hasInvalidInput ? (
        <p>Please enter a valid non-negative number.</p>
      ) : null}

      {!hasEmptyInput && !hasInvalidInput && filteredActivities.length === 0 ? (
        <p>No valid activities match that steps value.</p>
      ) : null}

      {!hasEmptyInput && !hasInvalidInput && filteredActivities.length > 0 ? (
        <div>
          {filteredActivities.map((activity) => (
            <ActivityCard key={getActivityId(activity)} activity={activity} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default FilterPage
