import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit) && newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
});

export default OTPInput;
