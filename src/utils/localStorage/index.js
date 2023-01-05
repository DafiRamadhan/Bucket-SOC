import AsyncStorage from '@react-native-async-storage/async-storage';

//simpan data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

//mengambil data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value)
    }
  } catch (e) {
    // error reading value
  }
};

//hapus data
export const clearData = async() => {
  AsyncStorage.clear();
}