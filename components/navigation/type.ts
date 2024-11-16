import { WashingType } from "@/service/machineService";
import MapScreen from './../../app/(tabs)/map/MapScreen';

export type RootParamList = {
  Home: undefined; // Không có tham số
  QRCodeScreen: undefined; // Không có tham số
  MachineDataScreen: {machineId:number}; // Không có tham số

  Machine: undefined; // Không có tham số
  MachineScreen: undefined;
  OptionsScreen: { id: number };
  ConfirmScreen: {id: number, washingType: WashingType}
  NoticeStatus: {success: boolean, message?: string}; 

  WalletScreen: undefined; // Không có tham số
  TopUpScreen: undefined; // Không có tham số
  WithdrawScreen: undefined; // Không có tham số

  Notification: undefined; // Không có tham số

  MapScreen: undefined; // Không có tham số

  SettingScreen: undefined; // Không có tham số
  OwnerLayout: undefined; // Không có tham số
  OwnerScreen: undefined;
  OwnerMachineScreen: undefined;
  OwnerMachineDetailScreen: undefined;
};
