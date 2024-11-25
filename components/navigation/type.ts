import { Location } from "@/service/LocationService";
import { WashingType } from "@/service/machineService";

export type RootParamList = {
  index: undefined; // Không có tham số
  Home: undefined; // Không có tham số
  HomeLayout: undefined;
  QRCodeScreen: undefined; // Không có tham số
  MachineDataScreen: { machineId?: number; location?: Location }; // Không có tham số

  Machine: { screen?: string; params?: object } | undefined; // Không có tham số
  MachineScreen: undefined;
  OptionsScreen: { id: number };
  ConfirmScreen: { id: number; washingType: WashingType };
  NoticeStatus: { success: boolean; message?: string };
  HistoryMachineScreen: undefined; // Không có tham số

  WalletScreen: undefined; // Không có tham số
  TopUpScreen: undefined; // Không có tham số
  ShowQRCodeScreen: { amount: number }; // Không có tham số
  WithdrawScreen: undefined; // Không có tham số

  Notification: undefined; // Không có tham số

  MapLayout: { screen?: string; param?: object }; // Không có tham số
  MapScreen: undefined; // Không có tham số
  SelectLocationScreen: { setLocation: void } | undefined; // Không có tham số

  Setting: undefined; // Không có tham số
  SettingScreen: undefined; // Không có tham số
  OwnerLayout: { screen?: string; param?: object }; // Không có tham số
  HomeOwnerScreen: undefined;
  OwnerScreen: undefined;
  OwnerMachineDetailScreen: undefined;
};
