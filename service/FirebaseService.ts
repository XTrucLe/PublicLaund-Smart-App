import { realtimeDB } from "@/firebaseConfig";
import { get, ref } from "@firebase/database";

async function getMachines() {
  try {
    const machinesRef = ref(realtimeDB, "machines");
    const snapshot = await get(machinesRef);

    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, data]) => ({
        id,
        ...(typeof data === "object" && data !== null ? data : {}),
      }));
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching machines: ", error);
    throw new Error("Failed to fetch machines");
  }
}

export { getMachines };
