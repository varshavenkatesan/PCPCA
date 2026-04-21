import DataTable from '../components/DataTable';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

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

function HomePage() {
  const {
    state: { data, loading, error },
    dispatch,
  } = useAppContext();

  const activities = Array.isArray(data) ? data : [];
  const validActivities = activities.filter((activity) => isValidActivity(activity));

  const handleToggleGoal = (activityId) => {
    dispatch({ type: 'TOGGLE_GOAL', payload: activityId });
  };

  return (
    <main>
      <Navbar />
      <section style={{ padding: '1rem' }}>
        <h1>Activities</h1>
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {!loading && !error && (
          <DataTable rows={validActivities} onToggleGoal={handleToggleGoal} />
        )}
      </section>
    </main>
  );
}

export default HomePage;
