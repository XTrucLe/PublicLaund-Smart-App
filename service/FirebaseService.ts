import {
  getDatabase,
  ref,
  get,
  DataSnapshot,
  onValue,
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

const handleCheckErrorStatus = (machines: machineFirebase[]) => {
  const errorMachines = machines.filter(
    (machine) => machine.status.toLowerCase() === "error"
  );
  if (errorMachines.length > 0) {
    console.error("Error machines:", errorMachines);
    return true;
  }
  return false;
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

const onValueChange = () => {
  const realtimeDB = getDatabase(app);
  const dbRef = ref(realtimeDB, "machines");

  return onValue(dbRef, (snapshot) => {
    const data = transformSnapshot(snapshot);

    if (handleCheckErrorStatus(data)) {
      console.error("Error status detected");
    }
  });
};

export { getData, checkAvailableMachine, onValueChange };
