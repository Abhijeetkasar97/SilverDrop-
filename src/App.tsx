
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminAudit from "./pages/admin/AdminAudit";

// Mentor Pages
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorSessions from "./pages/mentor/MentorSessions";
import MentorMessages from "./pages/mentor/MentorMessages";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  element, 
  requiredRole,
}: { 
  element: JSX.Element;
  requiredRole?: string;
}) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to={`/${currentUser.role}`} />;
  }
  
  return <MainLayout>{element}</MainLayout>;
};

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (currentUser) {
    return <Navigate to={`/${currentUser.role}`} />;
  }
  
  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/register" element={<PublicRoute element={<Registration />} />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
            <Route path="/admin/sessions" element={<ProtectedRoute element={<AdminSessions />} requiredRole="admin" />} />
            <Route path="/admin/messages" element={<ProtectedRoute element={<AdminMessages />} requiredRole="admin" />} />
            <Route path="/admin/audit" element={<ProtectedRoute element={<AdminAudit />} requiredRole="admin" />} />
            
            {/* Mentor routes */}
            <Route path="/mentor" element={<ProtectedRoute element={<MentorDashboard />} requiredRole="mentor" />} />
            <Route path="/mentor/sessions" element={<ProtectedRoute element={<MentorSessions />} requiredRole="mentor" />} />
            <Route path="/mentor/messages" element={<ProtectedRoute element={<MentorMessages />} requiredRole="mentor" />} />
            
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
