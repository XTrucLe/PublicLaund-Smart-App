export type SettingItemProps = {
    icon?: string;
    label?: string;
    onToggle?: () => void;
  };
  
  export const settingsOptions = [
    { id: 'account', icon: 'person', label: 'Thông tin tài khoản' },
    { id: 'notifications', icon: 'notifications', label: 'Cài đặt thông báo' },
    { id: 'payment', icon: 'wallet', label: 'Cài đặt thanh toán' },
    { id: 'language', icon: 'globe', label: 'Ngôn ngữ' },
    { id: 'checkout', icon: 'exit-outline', label: 'Thoát' },
  ];
    