
export type UserRole = 'admin' | 'mentor';

export interface User {
  id: string;
  name:string;
  email: string;
  role: "admin" | "mentor";
  token: string; // ➕ Add token
}


export type SessionType = 'live' | 'evaluation' | 'recording';

export interface Session {
  _id: string;
  mentor: {
    _id: string;
    name: string;
    email: string;
  };
  type: string;         
  date: string;
  duration: number;     
  ratePerHour: number;
  status: string;       // e.g. "Paid"
  createdAt: string;
  updatedAt: string;
}

export interface Mentor {
  _id: string;
  name: string;
  email: string;
}

export interface Session {
  _id: string;
  date: string;
  duration: number;
  type: string;
  ratePerHour: number;
  status: string;
}

// export interface Receipt {
//   _id: string;
//   mentor: Mentor;
//   sessions: Session[];
//   subtotal: number;
//   tax: number;
//   deductions: number;
//   finalAmount: number;
//   message?: string;
//   status?: string;   
//   createdAt: string;
//   updatedAt: string;
// }
export type PaymentStatus = 'pending' | 'paid' | 'under-review';

export interface PayoutBreakdown {
  baseAmount: number;
  platformFee?: number;
  taxAmount?: number;
  taxPercentage?: number;
  deductions?: number;
  finalAmount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}
