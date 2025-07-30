import React, { useState } from 'react';
import { Plus, Search, Filter, Users, DollarSign, AlertTriangle, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/layout/Header';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFacility, setFilterFacility] = useState('');
  const [filterFeeStatus, setFilterFeeStatus] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);

  const students = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      age: 16,
      facility: 'Main Field',
      session: 'Technical Skills',
      coach: 'Coach Martinez',
      feeStatus: 'paid',
      lastPayment: '2024-01-15',
      nextDue: '2024-02-15',
      amount: 250,
      attendance: 85,
      performance: 8.2,
      overdue: false
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 15,
      facility: 'Training Ground A',
      session: 'Youth Development',
      coach: 'Coach Davis',
      feeStatus: 'overdue',
      lastPayment: '2023-12-10',
      nextDue: '2024-01-10',
      amount: 200,
      attendance: 78,
      performance: 7.8,
      overdue: true,
      overdueBy: 20
    },
    {
      id: '3',
      name: 'Mike Chen',
      age: 17,
      facility: 'Indoor Facility',
      session: 'Advanced Training',
      coach: 'Coach Johnson',
      feeStatus: 'pending',
      lastPayment: '2024-01-01',
      nextDue: '2024-02-01',
      amount: 300,
      attendance: 92,
      performance: 9.1,
      overdue: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      age: 16,
      facility: 'Main Field',
      session: 'Technical Skills',
      coach: 'Coach Martinez',
      feeStatus: 'paid',
      lastPayment: '2024-01-20',
      nextDue: '2024-02-20',
      amount: 250,
      attendance: 88,
      performance: 8.5,
      overdue: false
    },
  ];

  const facilities = ['Main Field', 'Training Ground A', 'Indoor Facility'];
  const coaches = ['Coach Martinez', 'Coach Davis', 'Coach Johnson'];
  const sessions = ['Technical Skills', 'Youth Development', 'Advanced Training'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFacility = !filterFacility || student.facility === filterFacility;
    const matchesFeeStatus = !filterFeeStatus || student.feeStatus === filterFeeStatus;
    return matchesSearch && matchesFacility && matchesFeeStatus;
  });

  const overdueStudents = students.filter(student => student.overdue);
  const totalRevenue = students.reduce((sum, student) => sum + student.amount, 0);
  const paidStudents = students.filter(student => student.feeStatus === 'paid').length;

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateFeeStatus = (studentId: string, newStatus: string) => {
    console.log('Updating fee status for student:', studentId, 'to:', newStatus);
    // Handle fee status update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Student Management" userRole="Head Coach" userName="Coach Thompson" />
      
      <div className="p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fees Paid</p>
                  <p className="text-2xl font-bold">{paidStudents}/{students.length}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueStudents.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Alerts */}
        {overdueStudents.length > 0 && (
          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Students with Overdue Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdueStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <span className="font-medium">{student.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        Overdue by {student.overdueBy} days - ${student.amount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => updateFeeStatus(student.id, 'paid')}
                    >
                      Mark as Paid
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Student Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Roster</CardTitle>
              <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input id="studentName" placeholder="Enter full name" />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="16" />
                    </div>
                    <div>
                      <Label htmlFor="facility">Facility</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select facility" />
                        </SelectTrigger>
                        <SelectContent>
                          {facilities.map(facility => (
                            <SelectItem key={facility} value={facility}>
                              {facility}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="session">Session</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session" />
                        </SelectTrigger>
                        <SelectContent>
                          {sessions.map(session => (
                            <SelectItem key={session} value={session}>
                              {session}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Add Student</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex-1 min-w-64">
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterFacility} onValueChange={setFilterFacility}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Facilities</SelectItem>
                  {facilities.map(facility => (
                    <SelectItem key={facility} value={facility}>
                      {facility}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterFeeStatus} onValueChange={setFilterFeeStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Fee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map(student => (
                <div key={student.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-600">
                        Age {student.age} • {student.facility} • {student.session}
                      </p>
                      <p className="text-sm text-gray-500">Coach: {student.coach}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getFeeStatusColor(student.feeStatus)}>
                        {student.feeStatus}
                      </Badge>
                      {student.overdue && (
                        <Badge variant="destructive">
                          {student.overdueBy} days overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Attendance:</span>
                      <p className="font-medium">{student.attendance}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Performance:</span>
                      <p className="font-medium">{student.performance}/10</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fee Amount:</span>
                      <p className="font-medium">${student.amount}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Payment:</span>
                      <p className="font-medium">{student.lastPayment}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Due:</span>
                      <p className="font-medium">{student.nextDue}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateFeeStatus(student.id, 'paid')}
                    >
                      Update Fee Status
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
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

export default StudentManagement;