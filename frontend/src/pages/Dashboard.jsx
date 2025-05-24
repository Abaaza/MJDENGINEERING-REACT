import { useProjects } from '../hooks/useProjects';
import ProjectTable from '../components/ProjectTable';
import SkeletonTable from '../components/SkeletonTable';

export default function Dashboard() {
  const { data, isLoading } = useProjects();
  return (
    <>
      <h1 className="text-2xl font-semibold text-brand-dark mb-2">Projects</h1>
      {isLoading ? <SkeletonTable /> : <ProjectTable projects={data} />}
    </>
  );
}
