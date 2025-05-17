
import React from "react";
import { PaymentStatus } from "../../types";

interface StatusBadgeProps {
  status: PaymentStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case "paid":
        return "status-paid";
      case "pending":
        return "status-pending";
      case "under-review":
        return "status-review";
      default:
        return "status-pending";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "under-review":
        return "Under Review";
      default:
        return "Unknown";
    }
  };

  return <span className={getStatusClasses()}>{getStatusLabel()}</span>;
};

export default StatusBadge;
