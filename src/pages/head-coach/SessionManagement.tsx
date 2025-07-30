import React, { useState } from 'react';
import { Plus, Calendar, Users, MapPin, Clock, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';

const SessionManagement = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddAgeGroup, setShowAddAgeGroup] = useState(false);
  const [showAddBatch, setShowAddBatch] = useState(false);

  const facilities = [
    { id: '1', name: 'Main Field', location: 'Central Campus' },
    { id: '2', name: 'Training Ground A', location: 'North Campus' },
    { id: '3', name: 'Indoor Facility', location: 'Sports Complex' },
  ];

  const ageGroups = [
    { id: '1', name: 'Under 12', minAge: 8, maxAge: 12, sessions: 15 },
    { id: '2', name: 'Under 16', minAge: 13, maxAge: 16, sessions: 22 },
    { id: '3', name: 'Under 18', minAge: 17, maxAge: 18, sessions: 18 },
  ];

  const sessionTypes = [
    { id: '1', name: 'Technical Skills', duration: 90, maxStudents: 15 },
    { id: '2', name: 'Tactical Training', duration: 120, maxStudents: 20 },
    { id: '3', name: 'Physical Conditioning', duration: 60, maxStudents: 25 },
    { id: '4', name: 'Individual Training', duration: 45, maxStudents: 5 },
  ];

  const batches = [
    { id: '1', name: 'Morning Batch A', timeSlot: '8:00 AM - 10:00 AM', capacity: 20, enrolled: 18 },
    { id: '2', name: 'Evening Batch B', timeSlot: '4:00 PM - 6:00 PM', capacity: 25, enrolled: 22 },
    { id: '3', name: 'Weekend Elite', timeSlot: '10:00 AM - 12:00 PM', capacity: 15, enrolled: 12 },
  ];

  const sessions = [
    {
      id: '1',
      title: 'Technical Skills',
      facility: 'Main Field',
      time: '9:00 AM - 10:30 AM',
      coach: 'Coach Martinez',
      ageGroup: 'Under 16',
      batch: 'Morning Batch A',
      capacity: 15,
      enrolled: 12,
      status: 'completed',
      attendanceMarked: true
    },
    {
      id: '2',
      title: 'Tactical Training',
      facility: 'Training Ground A',
      time: '2:00 PM - 4:00 PM',
      coach: 'Coach Johnson',
      ageGroup: 'Under 18',
      batch: 'Evening Batch B',
      capacity: 20,
      enrolled: 18,
      status: 'ongoing',
      attendanceMarked: false
    },
    {
      id: '3',
      title: 'Individual Training',
      facility: 'Indoor Facility',
      time: '4:00 PM - 4:45 PM',
      coach: 'Coach Davis',
      ageGroup: 'Under 12',
      batch: 'Weekend Elite',
      capacity: 5,
      enrolled: 4,
      status: 'scheduled',
      attendanceMarked: false
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Session Management" userRole="Head Coach" userName="Coach Thompson" />
      
      <div className="p-4 md:p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold">{sessions.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Age Groups</p>
                  <p className="text-2xl font-bold">{ageGroups.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Session Types</p>
                  <p className="text-2xl font-bold">{sessionTypes.length}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Batches</p>
                  <p className="text-2xl font-bold">{batches.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Age Groups Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Age Groups</CardTitle>
                <Dialog open={showAddAgeGroup} onOpenChange={setShowAddAgeGroup}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Age Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Age Group</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ageGroupName">Age Group Name</Label>
                        <Input id="ageGroupName" placeholder="e.g., Under 14" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="minAge">Minimum Age</Label>
                          <Input id="minAge" type="number" placeholder="8" />
                        </div>
                        <div>
                          <Label htmlFor="maxAge">Maximum Age</Label>
                          <Input id="maxAge" type="number" placeholder="14" />
                        </div>
                      </div>
                      <Button className="w-full">Create Age Group</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ageGroups.map(group => (
                  <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-gray-600">
                        Ages {group.minAge}-{group.maxAge} • {group.sessions} sessions
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Types Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Session Types</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessionTypes.map(type => (
                  <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-600">
                        {type.duration} mins • Max {type.maxStudents} students
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sessions Overview</CardTitle>
              <div className="flex space-x-2">
                <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Facilities</SelectItem>
                    {facilities.map(facility => (
                      <SelectItem key={facility.id} value={facility.id}>
                        {facility.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={showAddSession} onOpenChange={setShowAddSession}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Session</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sessionTitle">Session Title</Label>
                        <Input id="sessionTitle" placeholder="Technical Skills Training" />
                      </div>
                      <div>
                        <Label htmlFor="facility">Facility</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select facility" />
                          </SelectTrigger>
                          <SelectContent>
                            {facilities.map(facility => (
                              <SelectItem key={facility.id} value={facility.id}>
                                {facility.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input id="startTime" type="time" />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End Time</Label>
                          <Input id="endTime" type="time" />
                        </div>
                      </div>
                      <Button className="w-full">Create Session</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-600">
                        {session.facility} • {session.time} • {session.coach}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                      {session.attendanceMarked ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Age Group:</span>
                      <p className="font-medium">{session.ageGroup}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Batch:</span>
                      <p className="font-medium">{session.batch}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Enrollment:</span>
                      <p className="font-medium">{session.enrolled}/{session.capacity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Attendance:</span>
                      <p className="font-medium">
                        {session.attendanceMarked ? 'Marked' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionManagement;