
import React from 'react';
import { Clock, Users, Calendar, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const CoachDashboard = () => {
  const currentSession = {
    title: 'Technical Skills Training',
    time: '2:00 PM - 3:30 PM',
    location: 'Main Field',
    students: 12,
    present: 10
  };

  const todaySchedule = [
    { id: 1, title: 'Youth Development', time: '9:00 AM', status: 'completed', students: 8 },
    { id: 2, title: 'Technical Skills', time: '2:00 PM', status: 'active', students: 12 },
    { id: 3, title: 'Advanced Training', time: '4:00 PM', status: 'upcoming', students: 6 },
  ];

  const recentStudents = [
    { id: 1, name: 'Alex Rodriguez', lastSeen: '2 hours ago', performance: 8.5 },
    { id: 2, name: 'Sarah Johnson', lastSeen: '1 day ago', performance: 7.8 },
    { id: 3, name: 'Mike Chen', lastSeen: '2 days ago', performance: 9.1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Coach Dashboard" userRole="Coach" userName="Coach Martinez" />
      
      <div className="p-4 md:p-6">
        {/* Current Session Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Right Now
              </span>
              <StatusBadge status="active" text="Live" className="bg-green-500 text-white border-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{currentSession.title}</h3>
                <p className="text-blue-100">{currentSession.time}</p>
                <p className="text-blue-100">{currentSession.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentSession.present}/{currentSession.students}</p>
                <p className="text-blue-100">Students Present</p>
                <Button variant="secondary" size="sm" className="mt-2">
                  Take Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {session.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {session.status === 'active' && <Clock className="h-5 w-5 text-blue-500 animate-pulse" />}
                        {session.status === 'upcoming' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                        <div>
                          <h4 className="font-medium text-gray-900">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{session.students} students</p>
                        <StatusBadge 
                          status={session.status as any} 
                          text={session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Search & Quick Access */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Quick Student Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search students..." className="mb-4" />
                <div className="space-y-2">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.lastSeen}</p>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{student.performance}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Attendance Portal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Performance Scoring
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
