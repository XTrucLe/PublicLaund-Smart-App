import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { MachineData } from "@/service/machineService";
import useStatusColor from "@/hooks/useStatus";
import { useStatusMachine } from "@/hooks/useStatusMachine";

interface MachineItemProps {
  machineData: MachineData;
}

const MachineOwnerItem: React.FC<MachineItemProps> = ({ machineData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle showing the modal with full machine details
  const showDetails = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const statusColor = useStatusMachine(machineData.status);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.mainInfo}>
        <Text style={styles.machineCode}>Mã máy: {machineData.id}</Text>
        <Text style={styles.machineName}>Tên máy: {machineData.name}</Text>
        <Text style={[styles.machineStatus, { color: statusColor.color }]}>
          Trạng thái: {machineData.status}
        </Text>
      </View>

      <TouchableOpacity onPress={showDetails} style={styles.menuButton}>
        <Text style={styles.menuText}>...</Text>
      </TouchableOpacity>

      {/* Modal for showing detailed machine data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết máy giặt</Text>
            <Text>Mã máy: {machineData.id}</Text>
            <Text>Tên máy: {machineData.name}</Text>
            <Text>Dung tích: {machineData.capacity} kg</Text>
            <Text>Model: {machineData.model}</Text>
            <Text>Trạng thái: {machineData.status}</Text>
            {machineData.secretId && (
              <Text>Mã bảo mật: {machineData.secretId}</Text>
            )}
            <Text>Địa chỉ: {machineData.locationAddress}</Text>
            <Text>Thành phố: {machineData.locationCity}</Text>
            <Text>Quận/huyện: {machineData.locationDistrict}</Text>
            <Text>Phường/xã: {machineData.locationWard}</Text>
            <View style={{ height: 12 }}></View>
            <Button title="Đóng" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
  },
  mainInfo: {
    flex: 1,
  },
  machineCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  machineName: {
    fontSize: 14,
    marginVertical: 4,
  },
  machineStatus: {
    fontSize: 14,
    color: "#888",
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default MachineOwnerItem;
