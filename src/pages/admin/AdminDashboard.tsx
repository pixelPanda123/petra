
import React from 'react';
import { Users, UserCheck, DollarSign, Activity, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/ui/MetricCard';
import Header from '@/components/layout/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const facilityData = [
    { facility: 'Main Field', students: 45, utilization: 85 },
    { facility: 'Training Ground A', students: 32, utilization: 70 },
    { facility: 'Training Ground B', students: 28, utilization: 65 },
    { facility: 'Indoor Court', students: 18, utilization: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" userRole="Administrator" userName="John Smith" />
      
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={127}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Active Coaches"
            value={8}
            icon={UserCheck}
            trend={{ value: 0, isPositive: true }}
          />
          <MetricCard
            title="Monthly Revenue"
            value="$67,400"
            icon={DollarSign}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="System Health"
            value="98.5%"
            icon={Activity}
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facility Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={facilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="facility" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Student</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Coach</span>
              </Button>
              <Button variant="outline">View System Logs</Button>
              <Button variant="outline">Manage Permissions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
