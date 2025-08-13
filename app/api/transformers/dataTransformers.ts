// app/api/transformers/dataTransformers.ts
import { CreateDogRequest, CreateUserRequest } from '../generated';

// Form interfaces for your UI
export interface FormUserInfo {
  name: string;
  password: string;
  age: string;
  bio: string;
}

export interface FormDogInfo {
  name: string;
  breed: string;
  age: string;
  size: string;
  energy: string;
  bio: string;
}

// Size and energy mappings
const UI_TO_API_SIZE_MAPPING = {
  'Small': 'SMALL',
  'Medium': 'MEDIUM', 
  'Large': 'LARGE',
} as const;

const UI_TO_API_ENERGY_MAPPING = {
  'Low': 'LOW',
  'Medium': 'MEDIUM',
  'High': 'HIGH',
  'Very High': 'VERY_HIGH',
} as const;

export const transformProfileDataForApi = (
  userInfo: FormUserInfo,
  dogInfo: FormDogInfo
): CreateUserRequest => {
  // Validate inputs
  if (!userInfo.name.trim() || !dogInfo.name.trim() || !dogInfo.size || !dogInfo.energy) {
    throw new Error('Name, dog name, size, and energy level are required');
  }

  // Transform dog data
  const dogRequest: CreateDogRequest = {
    name: dogInfo.name.trim(),
    age: parseInt(dogInfo.age) || 0,
    size: UI_TO_API_SIZE_MAPPING[dogInfo.size as keyof typeof UI_TO_API_SIZE_MAPPING] || 'MEDIUM',
    energy: UI_TO_API_ENERGY_MAPPING[dogInfo.energy as keyof typeof UI_TO_API_ENERGY_MAPPING] || 'MEDIUM',
    bio: dogInfo.bio.trim() || undefined,
    breed: dogInfo.breed.trim() || undefined,
    photos: []
  };

  // Transform user data
  const userRequest: CreateUserRequest = {
    name: userInfo.name.trim(),
    password: userInfo.password,
    age: parseInt(userInfo.age) || 18,
    bio: userInfo.bio.trim() || undefined,
    dog: dogRequest
  };

  return userRequest;
};

// Helper functions for reverse transformation (API to UI)
export const transformApiToUi = {
  size: (apiSize: string): string => {
    const mapping: Record<string, string> = {
      'SMALL': 'Small',
      'MEDIUM': 'Medium',
      'LARGE': 'Large'
    };
    return mapping[apiSize] || 'Medium';
  },
  
  energy: (apiEnergy: string): string => {
    const mapping: Record<string, string> = {
      'LOW': 'Low',
      'MEDIUM': 'Medium', 
      'HIGH': 'High',
      'VERY_HIGH': 'Very High'
    };
    return mapping[apiEnergy] || 'Medium';
  }
};