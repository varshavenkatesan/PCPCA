import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ActivityDetailPage from '../pages/ActivityDetailPage'
import ActivitiesPage from '../pages/ActivitiesPage'
import FilterPage from '../pages/FilterPage'
import NotFoundPage from '../pages/NotFoundPage'
import StatsPage from '../pages/StatsPage'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/activities" replace />}
            caseSensitive
          />
          <Route path="/activities" element={<ActivitiesPage />} caseSensitive />
          <Route
            path="/activities/:id"
            element={<ActivityDetailPage />}
            caseSensitive
          />
          <Route path="/filter" element={<FilterPage />} caseSensitive />
          <Route path="/stats" element={<StatsPage />} caseSensitive />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
)

export default AppRouter
