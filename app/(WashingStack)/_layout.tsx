import { createStackNavigator } from "@react-navigation/stack";
import confirmScreen from "./confirm";
import LaundryDetail from "./laundryDetail";
import SelectLaundry from "./selectLaundry";

const Stack = createStackNavigator();

export default function StackLayout() {
  return (
    <Stack.Navigator initialRouteName="SelectLaundry">
      <Stack.Screen
        name="SelectLaundry"
        component={SelectLaundry}
        options={{ title: "Select Laundry" }}
      />

      <Stack.Screen
        name="LaundryDetail"
        component={LaundryDetail}
        options={{ title: "Laundry Details" }}
      />
      <Stack.Screen
        name="Confirm"
        component={confirmScreen}
        options={{ title: "Confirm" }}
      />
    </Stack.Navigator>
  );
}
