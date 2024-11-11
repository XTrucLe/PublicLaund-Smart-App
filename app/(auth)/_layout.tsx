import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import OTPVerificationScreen from "./OTPVerificationScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const Stack = createStackNavigator();
export default function AuthenStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
