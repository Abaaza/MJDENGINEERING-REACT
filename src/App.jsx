import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ProjectOverview from './pages/ProjectOverview';          // ← new
import ProjectDocuments from './pages/ProjectDocuments';
import ProjectBoq from './pages/ProjectBoq';

const user = { name: 'Mark' }; // stub

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 bg-brand-light min-h-screen md:ml-60">
        <TopBar user={user} />

        <Routes>
          <Route index element={<Dashboard />} />

          {/* NEW overview page */}
          <Route path="/projects/:id" element={<ProjectOverview />} />

          {/* existing pages */}
          <Route path="/projects/:id/documents" element={<ProjectDocuments />} />
          <Route path="/projects/:id/boq" element={<ProjectBoq />} />

          <Route path="*" element={<p className="text-gray-500">Not found</p>} />
        </Routes>
      </main>
    </div>
  );
}
