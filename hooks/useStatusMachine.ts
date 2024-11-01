interface StatusInfo {
  color: string;
  label: string;
}

export const useStatusMachine = (status: string): StatusInfo => {
  switch (status.toLowerCase()) {
    case "available":
      return { color: "blue", label: "Available" };
    case "reserved":
      return { color: "orange", label: "Reserved" };
    case "in_use":
      return { color: "green", label: "In Use" };
    case "error":
      return { color: "red", label: "Error" };
    default:
      return { color: "gray", label: "Unknown" };
  }
};
