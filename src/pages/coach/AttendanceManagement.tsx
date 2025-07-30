import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertTriangle, CloudRain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/layout/Header';

const AttendanceManagement = () => {
  const [selectedSession, setSelectedSession] = useState('');
  const [sessionStatus, setSessionStatus] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');

  const sessions = [
    { id: '1', title: 'Youth Development', time: '9:00 AM - 10:30 AM', facility: 'Main Field', date: 'Today' },
    { id: '2', title: 'Technical Skills', time: '2:00 PM - 3:30 PM', facility: 'Training Ground A', date: 'Today' },
    { id: '3', title: 'Advanced Training', time: '4:00 PM - 5:30 PM', facility: 'Main Field', date: 'Today' },
  ];

  const coaches = [
    { id: '1', name: 'Coach Martinez', specialization: 'Technical' },
    { id: '2', name: 'Coach Johnson', specialization: 'Tactical' },
    { id: '3', name: 'Coach Davis', specialization: 'Physical' },
  ];

  const students = [
    { id: '1', name: 'Alex Rodriguez', age: 16, present: false },
    { id: '2', name: 'Sarah Johnson', age: 15, present: false },
    { id: '3', name: 'Mike Chen', age: 17, present: false },
    { id: '4', name: 'Emma Wilson', age: 16, present: false },
    { id: '5', name: 'David Brown', age: 15, present: false },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
  );

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: isPresent }));
  };

  const handleSubmitAttendance = () => {
    console.log('Submitting attendance:', { selectedSession, selectedCoach, sessionStatus, attendance });
    // Handle attendance submission
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'weather': return <CloudRain className="h-4 w-4 text-blue-500" />;
      case 'ongoing': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Attendance Management" userRole="Coach" userName="Coach Martinez" />
      
      <div className="p-4 md:p-6">
        {/* Session Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Mark Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Session</label>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map(session => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.title} - {session.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Session Coach</label>
                <Select value={selectedCoach} onValueChange={setSelectedCoach}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose coach" />
                  </SelectTrigger>
                  <SelectContent>
                    {coaches.map(coach => (
                      <SelectItem key={coach.id} value={coach.id}>
                        {coach.name} ({coach.specialization})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Session Status</label>
                <Select value={sessionStatus} onValueChange={setSessionStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Session status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="weather">Weather Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedSession && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {sessions.find(s => s.id === selectedSession)?.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {sessions.find(s => s.id === selectedSession)?.time} • 
                      {sessions.find(s => s.id === selectedSession)?.facility}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(sessionStatus)}
                    <Badge variant={sessionStatus === 'completed' ? 'default' : 'secondary'}>
                      {sessionStatus || 'Pending'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Attendance */}
        {selectedSession && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Student Attendance
                </span>
                <Badge variant="outline">
                  {Object.values(attendance).filter(Boolean).length}/{students.length} Present
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-500">Age: {student.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`present-${student.id}`}
                          checked={attendance[student.id]}
                          onCheckedChange={(checked) => 
                            handleAttendanceChange(student.id, checked as boolean)
                          }
                        />
                        <label htmlFor={`present-${student.id}`} className="text-sm font-medium">
                          Present
                        </label>
                      </div>
                      {attendance[student.id] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setAttendance(
                  students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
                )}>
                  Clear All
                </Button>
                <Button onClick={handleSubmitAttendance}>
                  Submit Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;