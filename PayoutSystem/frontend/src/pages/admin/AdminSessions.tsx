import React, { useState, useEffect } from "react";
import SessionsTable from "@/components/sessions/SessionsTable";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Session } from "../../types"; // fix import to your Session type
import { useAuth } from "@/context/AuthContext";

const AdminSessions = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSortOrder, setDateSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = currentUser?.token || "";
        const response = await fetch("http://localhost:5000/api/admin/sessions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching sessions: ${response.statusText}`);
        }

        const data: Session[] = await response.json();
        setSessions(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch sessions");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch sessions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [currentUser, toast]);

  // Filter sessions by status
  const filteredByStatus = statusFilter === "all"
    ? sessions
    : sessions.filter(s => s.status.toLowerCase() === statusFilter.toLowerCase());

  // Sort sessions by date
  const filteredSessions = filteredByStatus.sort((a, b) => {
    if (dateSortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // Example session select handler
  const handleSelectSession = (session: Session) => {
    // e.g. open detail modal or log it
    console.log("Selected session:", session);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <span className="font-semibold mr-2">Filter by status:</span>
          {["all", "paid", "pending", "under-review"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`mr-2 mb-2 px-3 py-1 rounded ${
                statusFilter === status ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <span className="font-semibold mr-2">Sort by date:</span>
          <button
            onClick={() => setDateSortOrder("newest")}
            className={`mr-2 px-3 py-1 rounded ${
              dateSortOrder === "newest" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Newest First
          </button>
          <button
            onClick={() => setDateSortOrder("oldest")}
            className={`px-3 py-1 rounded ${
              dateSortOrder === "oldest" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Oldest First
          </button>
        </div>
      </div>

      {loading && <p>Loading sessions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <Card>
        <CardContent>
          <SessionsTable sessions={filteredSessions} onSelectSession={handleSelectSession} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSessions;
