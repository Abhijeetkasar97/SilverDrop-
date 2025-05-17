import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import SessionsTable from "@/components/sessions/SessionsTable";
import { formatCurrency } from "@/utils/format";
import {
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  MessageSquareIcon,
  RefreshCcwIcon
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import ReceiptCard from "@/components/receipts/ReceiptCard";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Moved fetchData outside useEffect so we can call it from anywhere
  const fetchData = useCallback(async () => {
    if (!currentUser?.token) return;

    setLoading(true);
    setError(null);

    try {
      const token = currentUser.token;
      const [sessionsRes, receiptsRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/sessions", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/admin/receipts", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (!sessionsRes.ok || !receiptsRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const sessionsData = await sessionsRes.json();
      const receiptsData = await receiptsRes.json();

      setSessions(sessionsData);
      setReceipts(receiptsData);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser, toast]);

  // 🔁 Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // === STATS ===
  const totalMentors = [...new Set(sessions.map((s) => s.mentor._id))].length;

  const totalSessions = sessions.length;
  const totalPaid = receipts
    .filter((s) => s.status === "paid")
    .reduce((sum, s) => sum + (s.finalAmount || 0), 0);
  const totalPending = sessions
    .filter((s) => (s.status==="pending" || s.status === "Pending"))
    .reduce((sum, s) => sum + (s.ratePerHour || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage mentor sessions, payouts, and communications
          </p>
        </div>
        <Button onClick={fetchData} disabled={loading} variant="outline">
          <RefreshCcwIcon className="w-4 h-4 mr-2" />
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Mentors"
          value={totalMentors}
          icon={<UserIcon className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Sessions This Month"
          value={totalSessions}
          icon={<CalendarIcon className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Paid Amount"
          value={formatCurrency(totalPaid)}
          icon={<FileTextIcon className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Pending Amount"
          value={formatCurrency(totalPending)}
          icon={<MessageSquareIcon className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>
              Most recent mentor sessions and their statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading sessions...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <SessionsTable
                sessions={[...sessions]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .slice(0, 5)}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Receipts</CardTitle>
            <CardDescription>Latest generated payout receipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {receipts.length === 0 ? (
              <p className="text-muted-foreground">No receipts found.</p>
            ) : (
              receipts
                .slice(0, 3)
                .map((receipt) => (
                  <ReceiptCard key={receipt._id} receipt={receipt} />
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
