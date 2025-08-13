// app/hooks/useDogs.ts
import { useQuery } from '@tanstack/react-query';
import { DogService } from '../api/services/dogService';

export const useDogs = () => {
  return useQuery({
    queryKey: ['dogs'],
    queryFn: DogService.getAllDogs,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

export const useDogsBySize = (size: string) => {
  return useQuery({
    queryKey: ['dogs', 'by-size', size],
    queryFn: () => DogService.getDogsBySize(size),
    enabled: !!size,
    staleTime: 10 * 60 * 1000
  });
};

export const useDogsByEnergyRange = (minEnergy: string, maxEnergy: string) => {
  return useQuery({
    queryKey: ['dogs', 'by-energy', minEnergy, maxEnergy],
    queryFn: () => DogService.getDogsByEnergyRange(minEnergy, maxEnergy),
    enabled: !!minEnergy && !!maxEnergy,
    staleTime: 10 * 60 * 1000
  });
};