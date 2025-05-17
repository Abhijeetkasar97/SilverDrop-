import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatCurrency } from "../../utils/format";

// New structure
interface Receipt {
  _id: string;
  mentor: string;
  sessions: string[];
  subtotal: number;
  tax: number;
  deductions: number;
  finalAmount: number;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ReceiptCardProps {
  receipt: Receipt;
  mentorName?: string;
  onViewDetail?: (receipt: Receipt) => void;
  onDownload?: (receipt: Receipt) => void;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  mentorName = "Unknown Mentor",
  onViewDetail,
  onDownload,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  console.log(receipt)
  const shortId = receipt._id?.slice(-6).toUpperCase();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>Receipt #{shortId}</CardTitle>
          {/* Optional: <StatusBadge status={receipt.status} /> */}
        </div>
        <p className="text-sm text-muted-foreground">
          Created on {formatDate(receipt.createdAt)}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Mentor</p>
            <p className="font-semibold">{receipt.mentorName}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Sessions</p>
            <p className="font-semibold">
              1 session
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Subtotal</p>
              <p>{formatCurrency(receipt.subtotal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tax</p>
              <p>{formatCurrency(receipt.tax)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Deductions</p>
              <p>-{formatCurrency(receipt.deductions)}</p>
            </div>
            <div className="font-semibold">
              <p>Total</p>
              <p>{formatCurrency(receipt.finalAmount)}</p>
            </div>
          </div>

          {receipt.message && (
            <div>
              <p className="text-sm font-medium">Message</p>
              <p className="text-sm text-muted-foreground">{receipt.message}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" onClick={() => onViewDetail?.(receipt)}>
          View Details
        </Button>
        <Button variant="secondary" onClick={() => onDownload?.(receipt)}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiptCard;
