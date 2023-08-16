import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://ebvatzyrnnyhdzrelgru.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidmF0enlybm55aGR6cmVsZ3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MTU0ODksImV4cCI6MjAwNjk5MTQ4OX0.07aehdI1-4OaLH0yjQs_PqiiECKBKmn6jaKwXZBMR1E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidmF0enlybm55aGR6cmVsZ3J1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQxNTQ4OSwiZXhwIjoyMDA2OTkxNDg5fQ.bNa-XXI4lyjm0YbftpK1n5TRZhCa37U73Zmx2FqHlEQ
