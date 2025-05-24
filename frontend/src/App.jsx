import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ProjectOverview from './pages/ProjectOverview';
import ProjectDocuments from './pages/ProjectDocuments';
import ProjectBoq from './pages/ProjectBoq';
import NewProject from './pages/NewProject';


const user = { name: 'Mark' }; // stub

export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-brand-light min-h-screen">
        {/* TopBar now full width without inner padding constraints */}
        <TopBar user={user} />

        {/* Main content with internal padding */}
        <main className="p-8 space-y-6">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectOverview />} />
            <Route path="/projects/:id/documents" element={<ProjectDocuments />} />
            <Route path="/projects/:id/boq" element={<ProjectBoq />} />
            <Route path="*" element={<p className="text-gray-500">Not found</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
