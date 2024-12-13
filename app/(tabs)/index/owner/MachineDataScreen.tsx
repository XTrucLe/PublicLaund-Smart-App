import { NavigationProps, RouteProps } from "@/components/navigation";
import { addMachine } from "@/service/machineService";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

type DataProps = {
  navigation: NavigationProps<"MachineDataScreen">;
  route: RouteProps<"MachineDataScreen">;
};

type MachineDataForm = {
  name: string;
  model: string;
  capacity: number;
  hashKey: string;
  locationId: number | undefined;
  secretId?: string;
};

const MachineDataScreen = ({ navigation, route }: DataProps) => {
  const { secretId, hashKey, location } = route.params;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<MachineDataForm>({
    secretId: secretId || "0",
    name: "",
    model: "",
    hashKey: hashKey || "",
    capacity: 0,
    locationId: location?.id || 0,
  });

  useEffect(() => {
    if (location) {
      setFormData((prevState) => ({
        ...prevState,
        locationId: location.id,
      }));
    }
  }, [location]);

  const listInput = [
    { key: "secretId", label: "Mã máy" },
    { key: "name", label: "Tên máy" },
    { key: "model", label: "Model" },
    { key: "capacity", label: "Sức chứa" },
  ];

  const handleChange = (key: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    for (const { key, label } of listInput) {
      if (!formData[key as keyof MachineDataForm]) {
        newErrors[key] = `Trường ${label} không được để trống.`;
      }
    }
    if (!formData.locationId) {
      newErrors["location"] = "Vui lòng chọn địa điểm.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      const response = await addMachine(formData);
      console.log("Response:", response, formData);

      if (response) {
        Alert.alert("Thành công", "Thêm máy thành công.", [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "index" }] }),
          },
        ]);
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Có lỗi xảy ra khi thêm máy. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Có lỗi xảy ra khi thêm máy.",
      });
    }
  };

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocationScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Nhập Dữ Liệu Máy</Text>

      {listInput.map(({ key, label }) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            placeholder={`Nhập ${label}`}
            value={String(formData[key as keyof MachineDataForm] ?? "")}
            onChangeText={(value) => handleChange(key, value)}
            style={styles.input}
            editable={key !== "secretId"}
          />
          {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
        </View>
      ))}

      {/* Phần tùy chỉnh riêng cho location */}
      <View style={styles.locationContainer}>
        <Text style={styles.label}>Địa điểm</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleSelectLocation}
        >
          <Text style={styles.locationText}>
            {location?.name || "Chọn địa điểm"}
          </Text>
        </TouchableOpacity>
        {errors["location"] && (
          <Text style={styles.errorText}>{errors["location"]}</Text>
        )}
      </View>

      <Button title="Gửi" onPress={handleSubmit} color="#007BFF" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#FFF",
  },
  locationContainer: {
    marginBottom: 15,
  },
  locationButton: {
    height: 50,
    justifyContent: "center",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#E9ECEF",
  },
  locationText: {
    fontSize: 16,
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default MachineDataScreen;
