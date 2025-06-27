
import React from 'react';
import { Users, UserCheck, Settings, FileText, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SystemOverviewCards from '@/components/admin/SystemOverviewCards';
import FinancialOverviewPanel from '@/components/admin/FinancialOverviewPanel';
import QuickAccessPanel from '@/components/admin/QuickAccessPanel';

const AdminDashboard = () => {
  const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: Users },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Coaches', href: '/admin/coaches', icon: UserCheck },
    { name: 'Facilities', href: '/admin/facilities', icon: MapPin },
    { name: 'System Logs', href: '/admin/logs', icon: FileText },
    { name: 'Permissions', href: '/admin/permissions', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar items={sidebarItems} />
      
      <div className="flex-1">
        <Header title="Admin Dashboard" userRole="Administrator" userName="John Smith" />
        
        <div className="p-6">
          {/* Auto-refresh indicator */}
          <div className="mb-4 text-xs text-gray-500 flex justify-end">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Auto-refresh: 60s</span>
            </span>
          </div>

          {/* System Overview Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">System Overview</h2>
            <SystemOverviewCards />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Panel - Financial Overview */}
            <div className="xl:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
              <FinancialOverviewPanel />
            </div>

            {/* Quick Access Panel */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
              <QuickAccessPanel />
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Keyboard Shortcuts</h3>
            <div className="text-xs text-blue-700 space-x-4">
              <span>Alt+D: Dashboard</span>
              <span>Alt+F: Financial</span>
              <span>Alt+U: User Manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
