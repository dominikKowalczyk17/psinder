// app/api/services/dogService.ts
import apiAdapter from '../client/ApiAdapter';
import { DogDto } from '../generated';

export class DogService {
  static async getAllDogs(): Promise<DogDto[]> {
    const response = await apiAdapter.dogs.getAllDogs();
    return response.data;
  }

  static async getDogById(id: number): Promise<DogDto> {
    const response = await apiAdapter.dogs.getDogById(id);
    return response.data;
  }

  static async getDogsBySize(size: string): Promise<DogDto[]> {
    const response = await apiAdapter.dogs.getDogsBySize(size);
    return response.data;
  }

  static async getDogsByEnergyRange(minEnergy: string, maxEnergy: string): Promise<DogDto[]> {
    const response = await apiAdapter.dogs.getDogsByEnergyRange(minEnergy, maxEnergy);
    return response.data;
  }
}