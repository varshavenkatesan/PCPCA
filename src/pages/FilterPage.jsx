import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { isValidActivity, normalizeActivity } from '../services/activityUtils';

function FilterPage() {
  const [minStepsInput, setMinStepsInput] = useState('');

  const {
    state: { data, loading, error },
    dispatch,
  } = useAppContext();

  const activities = Array.isArray(data) ? data : [];
  const validActivities = activities
    .filter((activity) => isValidActivity(activity))
    .map((activity) => normalizeActivity(activity));

  const validationMessage = useMemo(() => {
    if (minStepsInput === '') {
      return 'Please enter steps value';
    }

    if (!/^\d+$/.test(minStepsInput)) {
      return 'Please enter a valid non-negative number';
    }

    return '';
  }, [minStepsInput]);

  const filteredActivities = useMemo(() => {
    if (validationMessage) {
      return [];
    }

    const minSteps = Number(minStepsInput);
    return validActivities.filter((activity) => Number(activity.steps) >= minSteps);
  }, [validActivities, minStepsInput, validationMessage]);

  const handleToggleGoal = (activityId) => {
    dispatch({ type: 'TOGGLE_GOAL', payload: activityId });
  };

  return (
    <main>
      <Navbar />
      <section style={{ padding: '1rem' }}>
        <h1>Filter Activities</h1>
        <label htmlFor="steps-input">Minimum Steps</label>
        <input
          id="steps-input"
          data-testid="filter-input"
          type="text"
          value={minStepsInput}
          onChange={(event) => setMinStepsInput(event.target.value)}
          placeholder="Enter minimum steps"
          style={{ display: 'block', marginTop: '0.5rem', marginBottom: '0.75rem' }}
        />

        {validationMessage && <p style={{ color: '#b91c1c' }}>{validationMessage}</p>}
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {!loading && !error && !validationMessage && (
          <DataTable rows={filteredActivities} onToggleGoal={handleToggleGoal} />
        )}
      </section>
    </main>
  );
}

export default FilterPage;
