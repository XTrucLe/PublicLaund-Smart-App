export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
  if (!email) {
    return "Vui lòng nhập địa chỉ email của bạn.";
  } else if (!emailRegex.test(email)) {
    return "Vui lòng nhập một địa chỉ email hợp lệ.";
  }
  return null; // Không có lỗi
};

//Kiểm tra nhập liệu
export const validateFullName = (fullname: string) => {
  if (!fullname) {
    return "Vui lòng nhập họ tên của bạn.";
  }
  return null;
};

// Kiểm tra mật khẩu cho Đăng nhập
export const validatePasswordForLogin = (password: string) => {
  let errorMessage = "";

  if (!password) {
    errorMessage = "Vui lòng nhập mật khẩu của bạn.";
  }
  return errorMessage ? errorMessage.trim() : null; 
};

export const validatePassword = (password: string) => {
  let errorMessage = "";

  if (!password) {
    errorMessage = "Vui lòng nhập mật khẩu của bạn.";
  } else {
    if (password.length < 8) {
      errorMessage = "Mật khẩu phải có ít nhất 8 ký tự.";
    }
    if (!/[A-Z]/.test(password)) {
      errorMessage += "\n- Phải chứa ít nhất một ký tự viết hoa.";
    }
    if (!/[a-z]/.test(password)) {
      errorMessage += "\n- Phải chứa ít nhất một ký tự viết thường.";
    }
    if (!/\d/.test(password)) {
      errorMessage += "\n- Phải chứa ít nhất một số.";
    }
  }

  return errorMessage ? errorMessage.trim() : null; 
};

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
export const validatePhone = (phone: string) => {
  if (!phone) {
    return "Vui lòng nhập số điện thoại của bạn.";
  } else if (!phoneRegex.test(phone)) {
    return "Vui lòng nhập một số điện thoại hợp lệ.";
  }
  return null;
};
