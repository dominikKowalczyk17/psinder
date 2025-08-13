import { CreateDogRequest } from '../../types/Dog';
import { CreateUserRequest } from '../../types/User';
import { EnergyLevel } from '../../types/energyLevelType';
import { Size } from '../../types/sizeType';

/**
 * Data transformation utilities for API communication
 * 
 * TODO: Think about this architectural decision:
 * - Why put mappings here instead of in the component?
 * - How does this help with maintainability and testing?
 * - What happens when your Spring Boot backend changes formats?
 */

export const UI_TO_API_MAPPINGS = {
  size: {
    'Small': 'SMALL' as Size,
    'Medium': 'MEDIUM' as Size,
    'Large': 'LARGE' as Size,
  },
  energy: {
    'Low': 'LOW' as EnergyLevel,
    'Medium': 'MEDIUM' as EnergyLevel,
    'High': 'HIGH' as EnergyLevel,
    'Very High': 'VERY_HIGH' as EnergyLevel,
  }
} as const;

export const API_TO_UI_MAPPINGS = {
  size: {
    'SMALL': 'Small',
    'MEDIUM': 'Medium',
    'LARGE': 'Large',
  },
  energy: {
    'LOW': 'Low',
    'MEDIUM': 'Medium',
    'HIGH': 'High',
    'VERY_HIGH': 'Very High',
  }
} as const;

/**
 * Transform frontend form data to backend API format
 * 
 * TODO: Critical thinking - what validation should happen here?
 * - Should this function validate inputs or trust the caller?
 * - What happens if mapping values are missing?
 * - Should errors be thrown or should there be fallback values?
 */
export const transformProfileDataForApi = (
  userInfo: {
    name: string;
    password: string;
    age: string;
    bio: string;
  },
  dogInfo: {
    name: string;
    breed: string;
    age: string;
    size: string;
    energy: string;
    bio: string;
  }
): CreateUserRequest => {
  // TODO: Input validation - should we validate here or trust the component?
  // What are the trade-offs of validation at different layers?
  
  // TODO: Type safety - notice we're casting string to keyof. How can we make this safer?
  const sizeKey = dogInfo.size as keyof typeof UI_TO_API_MAPPINGS.size;
  const energyKey = dogInfo.energy as keyof typeof UI_TO_API_MAPPINGS.energy;
  
  const mappedSize = UI_TO_API_MAPPINGS.size[sizeKey];
  const mappedEnergy = UI_TO_API_MAPPINGS.energy[energyKey];
  
  // TODO: Error handling strategy - what should happen if mapping fails?
  // Should we throw an error, use a default, or return an error object?
  if (!mappedSize || !mappedEnergy) {
    throw new Error(`Invalid size "${dogInfo.size}" or energy "${dogInfo.energy}" value`);
  }

  // TODO: Data conversion - notice we're parsing strings to numbers
  // What should happen if parsing fails? What are reasonable defaults?
  const dogRequest: CreateDogRequest = {
    name: dogInfo.name.trim(),
    age: parseInt(dogInfo.age) || 0, // TODO: Is 0 a reasonable default for age?
    size: mappedSize,
    energy: mappedEnergy,
    bio: dogInfo.bio.trim() || undefined, // TODO: Empty string vs undefined - what does your backend expect?
    breed: dogInfo.breed.trim(),
    photos: [], // TODO: Photo handling - your form doesn't collect photos yet
  };

  const userRequest: CreateUserRequest = {
    name: userInfo.name.trim(),
    password: userInfo.password, // TODO: Should we validate password strength here?
    age: parseInt(userInfo.age) || 18, // TODO: What's a reasonable age default?
    bio: userInfo.bio.trim() || undefined,
    dog: dogRequest,
  };

  return userRequest;
};

/**
 * Transform backend API data to frontend display format
 * TODO: When would you use this function?
 * Think about: editing existing profiles, displaying user data from API
 */
export const transformApiDataForDisplay = (apiData: any) => {
  // TODO: Implement when you need to load existing user data for editing
  // This will be useful when you add profile editing functionality
  throw new Error('Not implemented yet - when do you think you\'ll need this?');
};

// TODO: Should we export utility functions for individual field transformations?
// For example, if you need to transform just size or energy in other places?
export const transformSizeToApi = (uiSize: string): Size => {
  const sizeKey = uiSize as keyof typeof UI_TO_API_MAPPINGS.size;
  const apiSize = UI_TO_API_MAPPINGS.size[sizeKey];
  
  if (!apiSize) {
    throw new Error(`Invalid size value: ${uiSize}`);
  }
  
  return apiSize;
};

export const transformEnergyToApi = (uiEnergy: string): EnergyLevel => {
  const energyKey = uiEnergy as keyof typeof UI_TO_API_MAPPINGS.energy;
  const apiEnergy = UI_TO_API_MAPPINGS.energy[energyKey];
  
  if (!apiEnergy) {
    throw new Error(`Invalid energy value: ${uiEnergy}`);
  }
  
  return apiEnergy;
};