import React from "react";
import { formatCurrency } from "@/utils/format";
import StatusBadge from "../dashboard/StatusBadge";
import { PaymentStatus, Session } from "../../types";

interface SessionsTableProps {
  sessions: Session[];
  onSelectSession?: (session: Session) => void;
}

const SessionsTable: React.FC<SessionsTableProps> = ({ sessions, onSelectSession }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "live":
        return "Live Session";
      case "evaluation":
        return "Evaluation";
      case "review":
        return "Recording Review";
      default:
        return type;
    }
  };

  const normalizeStatus = (status: string): PaymentStatus => {
    switch (status.toLowerCase()) {
      case "paid":
        return "paid";
      case "pending":
        return "pending";
      case "under review":
      case "under-review":
        return "under-review";
      default:
        return "pending";
    }
  };

  if (sessions.length === 0) {
    return <p className="text-center py-4 text-muted-foreground">No sessions available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Mentor</th>
            <th className="text-left px-4 py-2">Date</th>
            <th className="text-left px-4 py-2">Type</th>
            <th className="text-left px-4 py-2">Duration</th>
            <th className="text-left px-4 py-2">Rate</th>
            <th className="text-left px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              onClick={() => onSelectSession?.(session)}
              className={onSelectSession ? "cursor-pointer hover:bg-muted/50" : ""}
              role={onSelectSession ? "button" : undefined}
              tabIndex={onSelectSession ? 0 : undefined}
              onKeyDown={(e) => {
                if (onSelectSession && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelectSession(session);
                }
              }}
            >
              <td className="px-4 py-2">{session.mentorName ?? "Unknown"}</td>
              <td className="px-4 py-2">{formatDate(session.date)}</td>
              <td className="px-4 py-2">{getSessionTypeLabel(session.type)}</td>
              <td className="px-4 py-2">{session.duration} mins</td>
              <td className="px-4 py-2">{formatCurrency(session.ratePerHour)}/hr</td>
              <td className="px-4 py-2">
                <StatusBadge status={normalizeStatus(session.status)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionsTable;
