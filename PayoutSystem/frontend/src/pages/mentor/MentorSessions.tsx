import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import SessionsTable from "../../components/sessions/SessionsTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { formatCurrency } from "../../utils/format";
import { Session } from "../../types";

type ApiSession = {
  _id: string;
  mentor: string;
  type: "Live" | "Evaluation" | "Review";
  date: string;
  duration: number;
  ratePerHour: number;
  status: "Paid" | "Pending" | "Under Review";
  createdAt: string;
  updatedAt: string;
};

const MentorSessions = () => {
  const { currentUser } = useAuth();
  const mentorId = currentUser?._id;
  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    status: "all",
    dateRange: "all",
    sessionType: "all"
  });
  const [selectedSession, setSelectedSession] = useState<ApiSession | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    type: "Live",
    duration: 60,
    ratePerHour: 4000,
    status: "Pending"
  });
  useEffect(() => {
    if (!mentorId) return;
    setLoading(true);

    fetch(`http://localhost:5000/api/mentors/sessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser?.token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSessions(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mentorId]);
  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/mentors/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error from backend:", data);
        return;
      }

      setSessions((prev) => [data.session, ...prev]);
      setIsAddSessionDialogOpen(false);

      setFormData({
        date: "",
        type: "Live",
        duration: 60,
        ratePerHour: 4000,
        status: "Pending"
      });
    } catch (err) {
      console.error("Failed to add session:", err);
    }
  };

  const handleFilterChange = (key: keyof typeof filter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const filteredSessions = sessions.filter((session) => {
    if (
      filter.status !== "all" &&
      session.status.toLowerCase() !== filter.status
    ) {
      return false;
    }

    if (
      filter.sessionType !== "all" &&
      session.type.toLowerCase() !== filter.sessionType
    ) {
      return false;
    }

    if (filter.dateRange !== "all") {
      const sessionDate = new Date(session.date);
      const today = new Date();

      switch (filter.dateRange) {
        case "7days":
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(today.getDate() - 7);
          if (sessionDate < sevenDaysAgo) return false;
          break;
        case "15days":
          const fifteenDaysAgo = new Date();
          fifteenDaysAgo.setDate(today.getDate() - 15);
          if (sessionDate < fifteenDaysAgo) return false;
          break;
        case "30days":
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          if (sessionDate < thirtyDaysAgo) return false;
          break;
      }
    }

    return true;
  });

  const handleSelectSession = (session: ApiSession) => {
    setSelectedSession(session);
    setIsDialogOpen(true);
  };
  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Sessions</h1>
          <p className="text-muted-foreground">
            View and track all your teaching sessions
          </p>
        </div>
        <Button onClick={() => setIsAddSessionDialogOpen(true)}>
          Add Session
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions History</CardTitle>
          <CardDescription>
            Complete history of your teaching sessions and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select
                  value={filter.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-filter">Date Range</Label>
                <Select
                  value={filter.dateRange}
                  onValueChange={(value) =>
                    handleFilterChange("dateRange", value)
                  }
                >
                  <SelectTrigger id="date-filter">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="15days">Last 15 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type-filter">Session Type</Label>
                <Select
                  value={filter.sessionType}
                  onValueChange={(value) =>
                    handleFilterChange("sessionType", value)
                  }
                >
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="evaluation">Evaluation</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredSessions.length > 0 ? (
            <SessionsTable
              sessions={filteredSessions}
              onSelectSession={handleSelectSession}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                No sessions found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Session Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>
              Detailed information about your session
            </DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mentor</Label>
                  <p className="font-medium">{currentUser.name}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">
                    {new Date(selectedSession.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="font-medium">{selectedSession.status}</p>
                </div>
                <div>
                  <Label>Session Type</Label>
                  <p className="font-medium">{selectedSession.type}</p>
                </div>
                <div>
                  <Label>Duration</Label>
                  <p className="font-medium">
                    {selectedSession.duration} minutes
                  </p>
                </div>
                <div>
                  <Label>Hourly Rate</Label>
                  <p className="font-medium">
                    {formatCurrency(selectedSession.ratePerHour)}
                  </p>
                </div>
                <div>
                  <Label>Amount</Label>
                  <p className="font-medium">
                    {formatCurrency(
                      (selectedSession.ratePerHour * selectedSession.duration) /
                        60
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Session Dialog */}
      <Dialog
        open={isAddSessionDialogOpen}
        onOpenChange={setIsAddSessionDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
            <DialogDescription>
              Add a new teaching session to your records
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSessionSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-date">Date</Label>
                <Input
                  id="session-date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-type">Session Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="session-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Live">Live Session</SelectItem>
                    <SelectItem value="Evaluation">Evaluation</SelectItem>
                    <SelectItem value="Review">Recording Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: parseInt(e.target.value)
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly-rate">Hourly Rate (₹)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={formData.ratePerHour}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ratePerHour: parseInt(e.target.value)
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Session
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorSessions;
