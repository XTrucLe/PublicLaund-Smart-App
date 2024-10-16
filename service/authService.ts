import * as Keychain from 'react-native-keychain';

const AuthService = {
  // API đăng nhập giả lập, thay thế bằng API thực tế của bạn
  async loginApi(username: string, password: string) {
    // Thay thế bằng logic API thực tế của bạn
    if (username === 'admin' && password === 'password') {
      return { token: 'fake-jwt-token' }; // Token giả lập
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Đăng nhập và lưu token
  async login(username: string, password: string) {
    try {
      const response = await this.loginApi(username, password);
      if (response.token) {
        await Keychain.setGenericPassword(username, response.token);
        console.log('Login successful, token saved!');
      }
      return true;  // Trả về true nếu đăng nhập thành công
    } catch (error) {
      console.log('Login failed:', (error as Error).message);
      return false; // Trả về false nếu đăng nhập thất bại
    }
  },

  // Đăng xuất và xóa token
  async logout() {
    try {
      await Keychain.resetGenericPassword();
      console.log('Logout successful, token removed!');
    } catch (error) {
      console.log('Logout failed:', (error as Error).message);
    }
  },

  // Lấy token đã lưu
  async getToken() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return credentials.password; // Trả về token đã lưu
      } else {
        return null; // Không có token
      }
    } catch (error) {
      console.log('Failed to load token:', (error as Error).message);
      return null;
    }
  },

  // Kiểm tra xem người dùng có đang đăng nhập không
  async isLoggedIn() {
    const token = await this.getToken();
    return token !== null; // Trả về true nếu có token, ngược lại là false
  },
};

export default AuthService;
