import { useQuery } from '@tanstack/react-query';
import { sampleProjects } from '../data/sampleProjects';

export function useProjects() {
  const api = import.meta.env.VITE_API_URL;

  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!api) {
        await new Promise((r) => setTimeout(r, 600));
        return sampleProjects;
      }

      const res = await fetch(`${api}/projects`);
      if (!res.ok) throw new Error('Failed to load projects');
      return res.json();
    },
  });
}