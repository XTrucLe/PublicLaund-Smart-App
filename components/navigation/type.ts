import { WashingType } from "@/service/machineService";

export type RootParamList = {
  Home: undefined; // Không có tham số

  MachineScreen: undefined;
  OptionsScreen: { id: number };
  ConfirmScreen: {id: number, washingType: WashingType}
  NoticeStatus: {success: boolean, message?: string}; 

  WalletScreen: undefined; // Không có tham số
  TopUpScreen: undefined; // Không có tham số
  WithdrawScreen: undefined; // Không có tham số

  Notification: undefined; // Không có tham số

  SettingScreen: undefined; // Không có tham số
  OwnerScreen: undefined;
};
