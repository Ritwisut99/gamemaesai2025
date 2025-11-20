export interface UserProfile {
  name: string;
  surname: string;
  age: string;
  gender: 'Male' | 'Female' | '';
}

export interface UploadedImage {
  id: number;
  dataUrl: string; // Base64 string
  timestamp: number;
}

export enum AppState {
  REGISTER = 'REGISTER',
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED'
}

export const TOPIC_COUNT = 20;
export const REQUIRED_COUNT = 10; // Minimum required to submit