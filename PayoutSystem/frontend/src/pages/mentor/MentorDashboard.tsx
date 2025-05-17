import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SessionsTable from "../../components/sessions/SessionsTable";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const MentorDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [sessions, setSessions] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [unviewedCount, setUnviewedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingReceipts, setLoadingReceipts] = useState(false);

  // Fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      if (!currentUser) return;

      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/mentors/sessions", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch sessions");
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        toast({
          title: "Error fetching sessions",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser, toast]);

  // Fetch receipts & unviewed count for notification
  useEffect(() => {
    const fetchReceipts = async () => {
      if (!currentUser) return;

      setLoadingReceipts(true);
      try {
        // Fetch all receipts
        const resAll = await fetch("http://localhost:5000/api/mentors/receipts", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        if (!resAll.ok) throw new Error("Failed to fetch receipts");
        const allReceipts = await resAll.json();
        setReceipts(allReceipts);

        // Fetch only unviewed receipts to count notifications
        const resUnviewed = await fetch(
          "http://localhost:5000/api/mentors/receipts?isViewed=false",
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        if (!resUnviewed.ok) throw new Error("Failed to fetch unviewed receipts");
        const unviewedReceipts = await resUnviewed.json();
        setUnviewedCount(unviewedReceipts.length);
      } catch (err) {
        toast({
          title: "Error fetching receipts",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoadingReceipts(false);
      }
    };

    fetchReceipts();
  }, [currentUser, toast]);

  // Download helper function
  const downloadReceipt = (receipt) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(receipt, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `receipt_${receipt._id}.json`);
    dlAnchorElem.click();
  };

  // Handle download + mark viewed
  const handleDownload = async (receipt) => {
    try {
      downloadReceipt(receipt);

      // Mark as viewed in backend
      const res = await fetch(
        `http://localhost:5000/api/mentors/receipts/${receipt._id}/viewed`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to mark receipt as viewed");

      // Remove from unviewed count and update local receipts state
      setUnviewedCount((count) => Math.max(0, count - 1));
      setReceipts((prev) =>
        prev.map((r) => (r._id === receipt._id ? { ...r, isViewed: true } : r))
      );
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Could not download receipt",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
      </div>

      {/* Notification for new receipts */}
      {unviewedCount > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          You have {unviewedCount} new receipt
          {unviewedCount > 1 ? "s" : ""}! Please check below.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your recent teaching sessions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading sessions...</p>
          ) : sessions.length > 0 ? (
            <SessionsTable sessions={sessions.slice(0, 5)} />
          ) : (
            <p className="text-center py-6 text-muted-foreground">No sessions available.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Receipts</CardTitle>
          <CardDescription>Generated payout receipts</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingReceipts ? (
            <p>Loading receipts...</p>
          ) : receipts.length === 0 ? (
            <p className="text-muted-foreground">No receipts found.</p>
          ) : (
            receipts.map((receipt) => (
              <div
                key={receipt._id}
                className={`p-4 border rounded mb-4 ${
                  receipt.isViewed ? "bg-white" : "bg-yellow-50"
                }`}
              >
                <p>
                  <strong>Session ID:</strong> {receipt.sessions?._id || "N/A"}
                </p>
                <p>
                  <strong>Amount:</strong> ${receipt.finalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {receipt.status}
                </p>
                <p>
                  <strong>Message:</strong> {receipt.message || "—"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(receipt)}
                >
                  Download Receipt
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorDashboard;
