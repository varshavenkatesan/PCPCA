import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ActivityDetailsPage from '../pages/ActivityDetailsPage';
import ActivityListPage from '../pages/ActivityListPage';
import FilterPage from '../pages/FilterPage';
import NotFoundPage from '../pages/NotFoundPage';
import StatsPage from '../pages/StatsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route caseSensitive path="/activities" element={<ActivityListPage />} />
        <Route caseSensitive path="/activities/:id" element={<ActivityDetailsPage />} />
        <Route caseSensitive path="/filter" element={<FilterPage />} />
        <Route caseSensitive path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
