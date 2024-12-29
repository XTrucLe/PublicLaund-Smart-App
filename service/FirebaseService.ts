import {
  getDatabase,
  ref,
  get,
  DataSnapshot,
  onValue,
  onChildChanged,
} from "firebase/database";
import app from "../hooks/useFirebaseDatabase";

type machineFirebase = {
  id: string;
  status: string;
  duration?: number;
};

const transformSnapshot = (snapshot: DataSnapshot) => {
  const data = snapshot.val();
  const machines: machineFirebase[] = [];
  for (let id in data) {
    machines.push({
      id,
      status: data[id].status,
      duration: data[id].duration,
    });
  }
  return machines;
};

const getData = async (): Promise<machineFirebase[]> => {
  const realtimeDB = getDatabase(app); // Add this line to define realtimeDB
  const dbRef = ref(realtimeDB, "WashingMachineList"); // Add this line to define dbRef

  try {
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
      console.error("No data available");
      return [];
    }

    const newSnapshot = transformSnapshot(snapshot);

    return newSnapshot;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const handleCheckErrorStatus = (machine: machineFirebase) => {
  console.log("Error machine");
};

const checkMachineStatus = (
  machine: machineFirebase,
  statusCheck: string = "available"
) => {
  const status = machine.status.toLowerCase();
  if (status === "error") console.log("Error machine:", machine);

  return status === statusCheck;
};

// Kiểm tra xem máy có trạng thái "available" không
const checkAvailableMachine = async (key: string): Promise<boolean> => {
  try {
    const data = await getData();
    // Kiểm tra nếu dữ liệu không phải là một mảng
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return false;
    }

    // Tìm kiếm item với id khớp key
    const found = data.find((item) => item.id === key);

    if (found) {
      return checkMachineStatus(found);
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const onChildChange = async () => {
  const db = getDatabase();
  const dataRef = ref(db, "WashingMachineList");

  onChildChanged(dataRef, (snapshot) => {
    const updatedData = snapshot.val();
    const changedKey = snapshot.key;
    // console.log("Updated data:", updatedData);
    // console.log("Changed key:", changedKey);

    if (updatedData["status"].toLowerCase() === "error") {
      handleCheckErrorStatus(updatedData);
      console.log("Updated data:", updatedData);
    }
    return [changedKey, updatedData["status"]];
  });
};

export { getData, checkAvailableMachine, onChildChange };
