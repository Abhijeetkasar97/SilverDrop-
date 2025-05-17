
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mockAuditLogs } from "../../data/mockData";
import { SearchIcon, DownloadIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminAudit = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({
    action: "all",
    dateRange: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (key: keyof typeof filter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportLogs = () => {
    toast({
      title: "Logs Exported",
      description: "Audit logs have been exported successfully.",
    });
  };

  const filteredLogs = mockAuditLogs.filter((log) => {
    // Filter by action
    if (filter.action !== "all" && !log.action.toLowerCase().includes(filter.action.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (filter.dateRange !== "all") {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      
      switch (filter.dateRange) {
        case "today":
          if (logDate.getDate() !== today.getDate() ||
              logDate.getMonth() !== today.getMonth() ||
              logDate.getFullYear() !== today.getFullYear()) {
            return false;
          }
          break;
        case "yesterday":
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          if (logDate.getDate() !== yesterday.getDate() ||
              logDate.getMonth() !== yesterday.getMonth() ||
              logDate.getFullYear() !== yesterday.getFullYear()) {
            return false;
          }
          break;
        case "7days":
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(today.getDate() - 7);
          if (logDate < sevenDaysAgo) {
            return false;
          }
          break;
      }
    }

    // Search by details or username
    if (searchQuery && !log.details.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all system changes and user actions
          </p>
        </div>
        <Button variant="outline" onClick={handleExportLogs}>
          <DownloadIcon className="h-4 w-4 mr-2" /> Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>
            Complete audit trail of all actions within the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div>
                <Label htmlFor="action-filter">Action Type</Label>
                <Select 
                  value={filter.action}
                  onValueChange={(value) => handleFilterChange("action", value)}
                >
                  <SelectTrigger id="action-filter">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="generated">Receipt Generation</SelectItem>
                    <SelectItem value="updated">Updates</SelectItem>
                    <SelectItem value="login">Logins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-filter">Date Range</Label>
                <Select
                  value={filter.dateRange}
                  onValueChange={(value) => handleFilterChange("dateRange", value)}
                >
                  <SelectTrigger id="date-filter">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by user or details..."
                    className="pr-8"
                  />
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                    <td>{log.userName}</td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-muted-foreground">
                      No logs found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAudit;
