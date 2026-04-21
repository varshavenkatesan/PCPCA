import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { isValidActivity } from '../services/activityUtils';

function StatsPage() {
  const {
    state: { data, loading, error },
  } = useAppContext();

  const rows = Array.isArray(data) ? data : [];
  const validActivities = rows.filter((activity) => isValidActivity(activity));

  const totalActivities = validActivities.reduce((count) => count + 1, 0);
  const goalAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === true ? count + 1 : count),
    0
  );
  const goalNotAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === false ? count + 1 : count),
    0
  );

  useEffect(() => {
    window.appState = {
      totalActivities,
      goalAchievedCount,
      goalNotAchievedCount,
    };
  }, [totalActivities, goalAchievedCount, goalNotAchievedCount]);

  return (
    <main>
      <Navbar />
      <section style={{ padding: '1rem' }}>
        <h1>Stats</h1>
        {loading && <p>Loading stats...</p>}
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {!loading && !error && (
          <div>
            <div data-testid="total-activities">{totalActivities}</div>
            <div data-testid="goal-achieved">{goalAchievedCount}</div>
            <div data-testid="goal-not-achieved">{goalNotAchievedCount}</div>
          </div>
        )}
      </section>
    </main>
  );
}

export default StatsPage;
