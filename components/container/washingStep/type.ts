export type  WashingType = {
    id: number;
    name: string;
    duration: string;
    price: number;
  }

export type RootStackParamList = {
    Machine: undefined; // Không có tham số cho màn hình này
    SelectLaundry: { machineId: number }; // Định nghĩa tham số cho SelectLaundry
    LaundryDetail: { washingType: WashingType; machineId: string  }; // Định nghĩa tham số cho Details
    Confirm: { washingType: WashingType; machineId: string };
};