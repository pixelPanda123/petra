
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
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/head-coach" element={<HeadCoachDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
