import * as SecureStore from 'expo-secure-store';

// Lưu trữ token một cách an toàn
const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
  } catch (error) {
    console.error('Failed to save token', error);
  }
};

// Lấy token
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    return token;
  } catch (error) {
    console.error('Failed to retrieve token', error);
  }
};
