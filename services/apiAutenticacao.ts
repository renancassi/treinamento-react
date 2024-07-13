import axios from 'axios';
import { env } from '@/config/env';

export const apiAutenticacao = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: env.EXPO_PUBLIC_API_KEY,
  },
});
