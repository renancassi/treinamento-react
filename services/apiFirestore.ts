import axios from 'axios';
import { env } from '@/config/env';

export const apiFirestore = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${env.EXPO_PUBLIC_ID_PROJECT}/databases/(default)/`,
});
