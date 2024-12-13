// Hàm xử lý lỗi chung
export const handleError = (error: any, message: string) => {
  // Kiểm tra kiểu lỗi và xử lý theo từng loại
  if (error instanceof Error) {
  }
  // else if (error.response) {
  //   // Lỗi phản hồi từ server
  //   const { status, data } = error.response;
  //   console.error(`${message} - Status: ${status}, Data:`, data);
  // } else if (error.request) {
  //   // Lỗi do không nhận được phản hồi
  //   console.error(`${message}: No response from server`);
  // } else {
  //   // Lỗi khác
  //   console.error(`${message}:`, error);
  // }
};
