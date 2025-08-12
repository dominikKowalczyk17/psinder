import { EnergyLevel } from "@/types/energyLevelType";
import { Size } from "@/types/sizeType";

export interface Dog {
  id?: number;
  name: string;
  age: number;
  bio: string | null;
  breed: string | null;
  size: Size;
  energy: EnergyLevel;
  photos: string[] | null;
}

export interface CreateDogRequest {
  name: string;
  age: number;
  size: Size;
  energy: EnergyLevel;
  bio?: string;
  breed?: string;
  photos?: string[];
}