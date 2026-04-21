import { Link } from 'react-router-dom';

function DataTable({ rows, onToggleGoal }) {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {rows.map((activity, index) => (
        <article
          key={activity.activityId || index}
          data-testid="activity-item"
          style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem' }}
        >
          <h3 style={{ margin: 0 }}>{activity.name || 'Unknown'}</h3>
          <p style={{ margin: '0.25rem 0' }}>Date: {activity.date || 'No Date'}</p>
          <p style={{ margin: '0.25rem 0' }}>Steps: {activity.steps}</p>
          <p style={{ margin: '0.25rem 0' }}>Calories: {activity.caloriesBurned}</p>
          <p style={{ margin: '0.25rem 0' }}>Workout Minutes: {activity.workoutMinutes}</p>
          <p style={{ margin: '0.25rem 0' }}>Goal Achieved: {String(activity.goalAchieved)}</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to={`/activities/${activity.activityId}`}>View Details</Link>
            <button type="button" onClick={() => onToggleGoal(activity.activityId)}>
              Toggle Goal
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default DataTable;
