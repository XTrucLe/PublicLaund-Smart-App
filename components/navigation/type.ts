import { washingType } from "@/service/machineService";

export type RootParamList = {
  Home: undefined; // Không có tham số
  MachineScreen: undefined;
  OptionsScreen: { machineId: number };
  ConfirmScreen: {machineId: number, washingType: washingType}
  WalletScreen: undefined; // Không có tham số
  TopUpScreen: undefined; // Không có tham số
  WithdrawScreen: undefined; // Không có tham số
  Notification: undefined; // Không có tham số
  SettingScreen: undefined; // Không có tham số
};
