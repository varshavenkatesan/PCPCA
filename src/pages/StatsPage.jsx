import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { getActivityStats } from '../utils/activityUtils'

const StatsPage = () => {
  const { activities, loading, error } = useContext(AppContext)
  const { totalActivities, goalAchievedCount, goalNotAchievedCount } =
    getActivityStats(activities)

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
          <p>Question 5</p>
          <h1>Activities Analytics Dashboard</h1>
        </div>
      </header>

      <div>
        <article>
          <h2>Total Valid Activities</h2>
          <div data-testid="total-activities">{totalActivities}</div>
        </article>

        <article>
          <h2>Goal Achieved</h2>
          <div data-testid="goal-achieved">{goalAchievedCount}</div>
        </article>

        <article>
          <h2>Goal Not Achieved</h2>
          <div data-testid="goal-not-achieved">{goalNotAchievedCount}</div>
        </article>
      </div>
    </section>
  )
}

export default StatsPage
