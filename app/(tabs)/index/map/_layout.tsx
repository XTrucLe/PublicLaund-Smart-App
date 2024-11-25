import { RootParamList } from "@/components/navigation/type";
import { createStackNavigator } from "@react-navigation/stack"
import MapScreen from "./MapScreen";


const Stack= createStackNavigator<RootParamList>();
const MapLayout = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  )
}

export default MapLayout