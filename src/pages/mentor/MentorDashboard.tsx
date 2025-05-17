import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SessionsTable from "../../components/sessions/SessionsTable";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const MentorDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
// console.log(currentUser)
  useEffect(() => {
    const fetchSessions = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Get token from localStorage (adjust if you store it elsewhere)
        const token = currentUser.token
        console.log(token)
        if (!token) throw new Error("User not authenticated");

        const res = await fetch("http://localhost:5000/api/mentors/sessions", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          // try to get error message from response
          const errorData = await res.json().catch(() => ({}));
          const message = errorData.message || "Failed to fetch sessions";
          throw new Error(message);
        }

        const data = await res.json();
        setSessions(data);
      } catch (error) {
        toast({
          title: "Error fetching sessions",
          description: error.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser, toast]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
      </div>

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
    </div>
  );
};

export default MentorDashboard;
