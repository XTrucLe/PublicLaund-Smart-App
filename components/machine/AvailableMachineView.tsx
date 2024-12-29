import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { checkAvailable, MachineData } from "@/service/machineService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";
import { useStatusMachine } from "@/hooks/useStatusMachine";
import { checkAvailableMachine } from "@/service/FirebaseService";
import Toast from "react-native-toast-message";
import { get, getDatabase, onChildChanged, ref } from "firebase/database";

const AvailableMachineView: React.FC<MachineData> = ({
  id,
  name,
  status: initialStatus,
  capacity,
  model,
  locationName,
  secretId,
  locationId,
  locationWard,
  locationDistrict,
  locationCity,
  locationAddress,
}) => {
  const navigation = useNavigation<NavigationProps<"Home" | "MachineScreen">>();
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const { color, label } = useStatusMachine(currentStatus);
  const [reload, setReload] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [machineData, setMachineData] = useState<MachineData>({
    id,
    name,
    status: currentStatus,
    capacity,
    model,
    locationName,
    secretId,
    locationId,
    locationWard,
    locationDistrict,
    locationCity,
    locationAddress, // Add this line
  });
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "WashingMachineList");

    const unsubscribe = onChildChanged(dataRef, (snapshot) => {
      if (snapshot.key === secretId) {
        console.log("Machine data changed:", snapshot.val());
        const newStatus = snapshot.val().status;
        setCurrentStatus(newStatus);
      }
    });

    return () => unsubscribe();
  }, [secretId]);

  const fetchMachineData = async () => {
    try {
      const db = getDatabase();
      const machineRef = ref(db, `WashingMachineList/${secretId}`);
      const snapshot = await get(machineRef);

      if (snapshot.exists()) {
        const machineData = snapshot.val();
        console.log("Fetched machine data:", machineData);
        // Cập nhật trạng thái hoặc dữ liệu ở đây
      } else {
        console.log("No data available for this machine.");
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleNavigate = async () => {
    try {
      const result = await checkAvailableMachine(secretId ?? "");
      const check = await checkAvailable(id);
      if (result === true && check == true) {
        navigation.navigate("Machine", {
          screen: "OptionsScreen",
          params: { id },
        });
      } else {
        Toast.show({
          position: "top",
          topOffset: 50,
          type: "error",
          text1: `Máy giặt số #${id} hiện không sẵn sàng.`,
        });
        await fetchMachineData();
      }
    } catch (error) {
      console.error("Error in handleNavigate:", error);
      Toast.show({
        position: "top",
        topOffset: 50,
        type: "error",
        text1: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <Pressable onPress={handleOpenModal} style={styles.container}>
      <Header id={id} color={color} />
      <Content
        name={name}
        capacity={capacity}
        model={model}
        locationName={locationName}
        label={label}
        color={color}
      />
      <MachineInfoModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        machine={machineData}
        handleNavigate={handleNavigate}
      />
    </Pressable>
  );
};

const Header = React.memo(({ id, color }: { id: number; color: string }) => (
  <View style={styles.header}>
    <Text style={styles.machineText}>Máy giặt số #{id}</Text>
    <View
      style={[styles.statusCircle, { backgroundColor: color || "lightgray" }]}
    />
  </View>
));

const Content = React.memo(
  ({
    name,
    capacity,
    model,
    locationName,
    label,
    color,
  }: {
    name: string;
    capacity: number;
    model: string;
    locationName: string;
    label: string;
    color: string;
  }) => (
    <View style={styles.content}>
      <MaterialIcons
        name="local-laundry-service"
        size={36}
        color="#000"
        style={styles.icon}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Tên máy: {name}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Dung tích: {capacity} kg
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Model: {model}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Vị trí: {locationName}
          </Text>
        </View>
        <Text style={[styles.buttonText, { color: color ?? "#333" }]}>
          {label}
        </Text>
      </View>
    </View>
  )
);
type MachineInfoModalProps = {
  isVisible: boolean;
  onClose: () => void;
  machine: MachineData;
  handleNavigate: () => void;
};
const MachineInfoModal = ({
  isVisible,
  onClose,
  machine,
  handleNavigate,
}: MachineInfoModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Machine Information</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>ID: {machine?.id}</Text>
            <Text style={styles.infoText}>Tên máy: {machine?.name}</Text>
            <Text style={styles.infoText}>Trạng thái: {machine?.status}</Text>
            <Text style={styles.infoText}>Dung tích: {machine?.capacity}</Text>
            <Text style={styles.infoText}>Mẫu máy: {machine?.model}</Text>
            <Text style={styles.infoText}>
              Tên vị trí: {machine?.locationName}
            </Text>

            <Text style={styles.infoText}>Phường: {machine?.locationWard}</Text>
            <Text style={styles.infoText}>
              Quận/Huyện: {machine?.locationDistrict}
            </Text>
            <Text style={styles.infoText}>
              Thành phố: {machine?.locationCity}
            </Text>
            <Text style={styles.infoText}>
              Địa chỉ: {machine?.locationAddress}
            </Text>
          </View>
          <Button title="Đặt máy ngay ->" onPress={handleNavigate} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f7f7f7",
    opacity: 0.9,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "#b3e5fc",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeIconText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  details: {
    marginBottom: 10,
    maxWidth: "65%",
  },
  detailsText: {
    fontSize: 14,
    color: "#333",
    overflow: "hidden",
  },
  icon: {
    marginLeft: 4,
  },
  buttonText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
    fontSize: 16,
    padding: 4,
    borderRadius: 8,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginTop: 20,
  },
});

export default AvailableMachineView;
