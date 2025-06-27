
import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const HeadCoachDashboard = () => {
  const alerts = [
    { id: 1, type: 'warning', message: 'Low attendance in Advanced Training (45%)', action: 'Review' },
    { id: 2, type: 'alert', message: '3 students have overdue fees', action: 'Contact' },
    { id: 3, type: 'info', message: 'Coach Johnson unavailable next week', action: 'Schedule' },
  ];

  const todaySessions = [
    { id: 1, title: 'Youth Development', coach: 'Coach Davis', time: '9:00 AM', attendance: 12, capacity: 15 },
    { id: 2, title: 'Technical Skills', coach: 'Coach Martinez', time: '2:00 PM', attendance: 10, capacity: 12 },
    { id: 3, title: 'Advanced Training', coach: 'Coach Johnson', time: '4:00 PM', attendance: 0, capacity: 8 },
  ];

  const performanceData = [
    { name: 'Technical', value: 85 },
    { name: 'Tactical', value: 78 },
    { name: 'Physical', value: 82 },
    { name: 'Mental', value: 75 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 50000 },
    { month: 'Feb', revenue: 52000, target: 50000 },
    { month: 'Mar', revenue: 48000, target: 50000 },
    { month: 'Apr', revenue: 61000, target: 55000 },
    { month: 'May', revenue: 55000, target: 55000 },
    { month: 'Jun', revenue: 67000, target: 60000 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Head Coach Dashboard" userRole="Head Coach" userName="Coach Thompson" />
      
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Sessions Today"
            value={3}
            icon={Calendar}
          />
          <MetricCard
            title="Total Students"
            value={127}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Monthly Revenue"
            value="$67,400"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Coach Availability"
            value="87%"
            icon={CheckCircle}
            trend={{ value: -5, isPositive: false }}
          />
        </div>

        {/* Alerts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span className="text-sm text-gray-700">{alert.message}</span>
                  <Button variant="outline" size="sm">{alert.action}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.coach} • {session.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{session.attendance}/{session.capacity}</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(session.attendance / session.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Actual Revenue" />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeadCoachDashboard;
