import { useMemo } from "react";

interface StatusInfo {
  color: string;
  label: string;
}

export const useStatusMachine = (status: string): StatusInfo => {
  return useMemo(() => {
    switch (status.toLowerCase()) {
      case "available":
        return { color: "blue", label: "Available" };
      case "reserved":
        return { color: "orange", label: "Reserved" };
      case "in_use":
        return { color: "green", label: "In Use" };
      case "error":
        return { color: "red", label: "Error" };
      case "maintenance":
        return { color: "yellow", label: "Maintenance" };
      default:
        return { color: "gray", label: "Unknown" };
    }
  }, [status]);
};
