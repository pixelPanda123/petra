
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialOverviewPanel = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const facilityData = [
    { name: 'Main Field', value: 35, color: '#3b82f6' },
    { name: 'Training A', value: 25, color: '#10b981' },
    { name: 'Training B', value: 20, color: '#f59e0b' },
    { name: 'Indoor Court', value: 20, color: '#ef4444' },
  ];

  const paymentTrends = [
    { week: 'Week 1', payments: 85 },
    { week: 'Week 2', payments: 92 },
    { week: 'Week 3', payments: 78 },
    { week: 'Week 4', payments: 95 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Monthly Revenue Trend</span>
          </CardTitle>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Facility-wise Revenue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={facilityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {facilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Outstanding Payments</span>
          </CardTitle>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
            12 Students
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-sm">John Smith</span>
              <span className="text-red-600 font-medium">$450</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-sm">Sarah Johnson</span>
              <span className="text-red-600 font-medium">$320</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-sm">Mike Wilson</span>
              <span className="text-red-600 font-medium">$280</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Payment Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={paymentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payments" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverviewPanel;
