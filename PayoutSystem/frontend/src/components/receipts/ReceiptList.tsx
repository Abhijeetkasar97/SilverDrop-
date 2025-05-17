import React, { useEffect, useState } from "react";
import axios from "axios";
import ReceiptCard from "./ReceiptCard"; // Adjust path if needed
import { useAuth } from "@/context/AuthContext";
interface Receipt {
  _id: string;
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  mentor: {
    name: string;
  };
  sessions: any[];
  createdAt: string;
  subtotal: number;
  tax: number;
  deductions: number;
  finalAmount: number;
  message?: string;
}

const ReceiptList: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth()
useEffect(() => {
  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const token = currentUser?.token || null;
      const response = await fetch("http://localhost:5000/api/admin/receipts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch receipts");
      }

      const data = await response.json();
      setReceipts(data);
      console.log(receipts)
      console.log("Receipts from API:", data);
    } catch (error) {
      console.error("Error fetching receipts", error);
    } finally {
      setLoading(false);
    }
  };

  fetchReceipts();
}, []);

  
  if (loading) return <p>Loading receipts...</p>;
  if (receipts.length === 0) return <p>No receipts found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt._id}
          receipt={{
            id: receipt.id,
            status: receipt.status,
            dateRange: receipt.dateRange,
            mentorName: receipt.mentor.name,
            sessions: receipt.sessions,
            dateGenerated: receipt.createdAt,
            breakdown: {
              finalAmount: receipt.finalAmount,
            },
            message: receipt.message,
          }}
        />
      ))}
    </div>
  );
};

export default ReceiptList;
