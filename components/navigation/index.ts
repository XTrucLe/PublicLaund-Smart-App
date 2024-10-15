import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "./type";

// Kiểu tổng quát cho điều hướng và route
export type NavigationProps<T extends keyof RootParamList> =
    StackNavigationProp<RootParamList, T>;
// Kiểu tổng quát cho route để lấy params
export type RouteProps<T extends keyof RootParamList> = 
    RouteProp<RootParamList, T>;

// Cách sử dụng:
// import { NavigationProps, RouteProps } from "@/components/navigation";
// type Props = {
//   navigation: NavigationProps<"Home">; // Tên màn hình
//   route: RouteProps<"OptionsScreen">; // Nếu có params
// };

// const YourComponent: React.FC<Props> = ({ navigation, route }) => {
//       Sử dụng navigation và route tại đây
// };
