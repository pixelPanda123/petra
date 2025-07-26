import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, List, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const SessionsPage = () => {
  const [activeView, setActiveView] = useState('list');

  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Technical Skills', 
      coach: 'Coach Martinez', 
      time: '2:00 PM', 
      date: '2024-03-15',
      location: 'Field A',
      duration: '90 min',
      participants: 12
    },
    { 
      id: 2, 
      title: 'Fitness Training', 
      coach: 'Coach Johnson', 
      time: '4:00 PM', 
      date: '2024-03-16',
      location: 'Gym',
      duration: '60 min',
      participants: 8
    },
    { 
      id: 3, 
      title: 'Tactical Analysis', 
      coach: 'Coach Davis', 
      time: '10:00 AM', 
      date: '2024-03-18',
      location: 'Field B',
      duration: '75 min',
      participants: 15
    },
    { 
      id: 4, 
      title: 'Match Practice', 
      coach: 'Coach Martinez', 
      time: '5:00 PM', 
      date: '2024-03-20',
      location: 'Main Field',
      duration: '120 min',
      participants: 22
    },
  ];

  const weeklyTimetable = [
    { day: 'Monday', sessions: [
      { time: '4:00 PM', title: 'Fitness Training', coach: 'Coach Johnson' }
    ]},
    { day: 'Tuesday', sessions: [
      { time: '2:00 PM', title: 'Technical Skills', coach: 'Coach Martinez' }
    ]},
    { day: 'Wednesday', sessions: [
      { time: '4:00 PM', title: 'Tactical Analysis', coach: 'Coach Davis' }
    ]},
    { day: 'Thursday', sessions: [
      { time: '2:00 PM', title: 'Technical Skills', coach: 'Coach Martinez' },
      { time: '5:00 PM', title: 'Match Practice', coach: 'Coach Davis' }
    ]},
    { day: 'Friday', sessions: [
      { time: '10:00 AM', title: 'Tactical Analysis', coach: 'Coach Davis' }
    ]},
    { day: 'Saturday', sessions: [
      { time: '9:00 AM', title: 'Match Day', coach: 'All Coaches' }
    ]},
    { day: 'Sunday', sessions: [] },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Sessions" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Session Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Next Session"
            value="Today 2:00 PM"
            icon={Clock}
          />
          <MetricCard
            title="Sessions This Week"
            value="6"
            icon={Calendar}
          />
          <MetricCard
            title="Total Sessions"
            value="48"
            icon={CalendarDays}
          />
          <MetricCard
            title="Favorite Coach"
            value="Coach Martinez"
            icon={Users}
          />
        </div>

        {/* Sessions View */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Timetable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">{session.title}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {session.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {session.participants} students
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {session.duration}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Coach: {session.coach}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            {formatDate(session.date)}
                          </p>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Timetable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {weeklyTimetable.map((day) => (
                    <div key={day.day} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3 text-center">{day.day}</h4>
                      <div className="space-y-2">
                        {day.sessions.length > 0 ? (
                          day.sessions.map((session, index) => (
                            <div key={index} className="p-2 bg-white rounded border text-center">
                              <p className="text-xs font-medium text-blue-600">{session.time}</p>
                              <p className="text-xs text-gray-900">{session.title}</p>
                              <p className="text-xs text-gray-500">{session.coach}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 bg-white rounded border text-center">
                            <p className="text-xs text-gray-400">Rest Day</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-sm">Book Session</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <Clock className="h-5 w-5 mb-1" />
                <span className="text-sm">Reschedule</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <Users className="h-5 w-5 mb-1" />
                <span className="text-sm">Group Sessions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionsPage;