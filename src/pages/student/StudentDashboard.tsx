
import React from 'react';
import { Calendar, TrendingUp, DollarSign, Clock, Bell, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const StudentDashboard = () => {
  const upcomingSessions = [
    { id: 1, title: 'Technical Skills', coach: 'Coach Martinez', time: '2:00 PM', date: 'Today' },
    { id: 2, title: 'Fitness Training', coach: 'Coach Johnson', time: '4:00 PM', date: 'Tomorrow' },
    { id: 3, title: 'Tactical Analysis', coach: 'Coach Davis', time: '10:00 AM', date: 'Friday' },
  ];

  const recentNotifications = [
    { id: 1, message: 'New assessment score available', time: '2 hours ago' },
    { id: 2, message: 'Session rescheduled to 3:00 PM', time: '1 day ago' },
    { id: 3, message: 'Monthly fee payment due', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Dashboard" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Next Session"
            value="2:00 PM"
            icon={Clock}
          />
          <MetricCard
            title="Attendance Rate"
            value="94%"
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Performance Score"
            value="8.2/10"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
          <MetricCard
            title="Fee Status"
            value="Paid"
            icon={DollarSign}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Sessions</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.coach}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{session.time}</p>
                        <p className="text-xs text-gray-500">{session.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">My Sessions</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Performance</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="h-6 w-6 mb-2" />
                <span className="text-sm">Payments</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm">Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
