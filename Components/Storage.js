import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    //console.log(value)
  } catch (error) {
    console.error(error);
  }
};

export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return 'error';
  }
};