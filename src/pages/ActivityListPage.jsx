import DataTable from '../components/DataTable';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { isValidActivity, normalizeActivity } from '../services/activityUtils';

function ActivityListPage() {
  const {
    state: { data, loading, error },
    dispatch,
  } = useAppContext();

  const activities = Array.isArray(data) ? data : [];
  const validActivities = activities
    .filter((activity) => isValidActivity(activity))
    .map((activity) => normalizeActivity(activity));

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

export default ActivityListPage;
