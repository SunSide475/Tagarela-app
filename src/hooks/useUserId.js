import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');   
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error retrieving user')
      }
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useUserId;