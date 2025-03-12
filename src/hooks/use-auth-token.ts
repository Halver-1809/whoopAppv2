import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAuthToken = () => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthTokenState(token);
        }
      } catch (error) {
        console.error('Error loading token from storage:', error);
      }
    };

    loadToken();
  }, []);

  const setAuthToken = async (token: string | null) => {
    try {
      if (token) {
        await AsyncStorage.setItem('authToken', token);
      } else {
        await AsyncStorage.removeItem('authToken');
      }
      setAuthTokenState(token);
    } catch (error) {
      console.error('Error setting token in storage:', error);
    }
  };

  return { authToken, setAuthToken };
};
