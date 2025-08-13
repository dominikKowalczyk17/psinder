import { CreateDogRequest, Dog } from "./Dog";

export interface User {
    name: string,
    password: string,
    age: number,
    bio?: string,
    dog: Dog,
}

export interface CreateUserRequest {
    name: string,
    password: string,
    age: number,
    bio?: string,
    dog: CreateDogRequest,
}

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  name: string;
  password: string;
}