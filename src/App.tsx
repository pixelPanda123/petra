
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentManagement from "./pages/admin/StudentManagement";
import CoachManagement from "./pages/admin/CoachManagement";
import FacilityManagement from "./pages/admin/FacilityManagement";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendancePage from "./pages/student/AttendancePage";
import PerformancePage from "./pages/student/PerformancePage";
import SessionsPage from "./pages/student/SessionsPage";
import FeePage from "./pages/student/FeePage";
import CoachDashboard from "./pages/coach/CoachDashboard";
import HeadCoachDashboard from "./pages/head-coach/HeadCoachDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/coaches" element={<CoachManagement />} />
          <Route path="/admin/facilities" element={<FacilityManagement />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<AttendancePage />} />
          <Route path="/student/performance" element={<PerformancePage />} />
          <Route path="/student/sessions" element={<SessionsPage />} />
          <Route path="/student/fees" element={<FeePage />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/head-coach" element={<HeadCoachDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
