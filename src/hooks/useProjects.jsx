import { useQuery } from '@tanstack/react-query';
import { sampleProjects } from '../data/sampleProjects';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // TODO: replace with real fetch
      await new Promise((r) => setTimeout(r, 600));
      return sampleProjects;
    },
  });
}