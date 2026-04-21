import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { findActivityById, getEfficiency, normalizeActivity } from '../services/activityUtils';

function ActivityDetailsPage() {
  const { id } = useParams();
  const {
    state: { data, loading, error },
  } = useAppContext();

  const activities = Array.isArray(data) ? data : [];
  const activity = findActivityById(activities, id);

  if (loading) {
    return (
      <main>
        <Navbar />
        <section style={{ padding: '1rem' }}>
          <p>Loading activity...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Navbar />
        <section style={{ padding: '1rem' }}>
          <p style={{ color: '#b91c1c' }}>{error}</p>
        </section>
      </main>
    );
  }

  if (!activity) {
    return (
      <main>
        <Navbar />
        <section style={{ padding: '1rem' }}>
          <p>Activity not found</p>
          <Link to="/activities">Back to activities</Link>
        </section>
      </main>
    );
  }

  const normalized = normalizeActivity(activity);
  const efficiency = getEfficiency(normalized.caloriesBurned, normalized.workoutMinutes);

  return (
    <main>
      <Navbar />
      <section style={{ padding: '1rem' }}>
        <h1>{normalized.name}</h1>
        <p>Activity ID: {normalized.activityId}</p>
        <p>Date: {normalized.date}</p>
        <p>Steps: {normalized.steps}</p>
        <p>Calories Burned: {normalized.caloriesBurned}</p>
        <p>Workout Minutes: {normalized.workoutMinutes}</p>
        <p>Goal Achieved: {String(normalized.goalAchieved)}</p>
        <p>Efficiency: {Number.isFinite(efficiency) ? efficiency.toFixed(2) : '0.00'}</p>
      </section>
    </main>
  );
}

export default ActivityDetailsPage;
