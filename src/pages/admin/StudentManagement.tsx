
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Download, Upload, Edit, Eye, UserX, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: 'John Smith',
      age: 16,
      facility: 'Main Field',
      session: 'Advanced Training',
      coach: 'Mike Johnson',
      status: 'Active',
      fees: 0,
    },
    {
      id: 2,
      name: 'Sarah Davis',
      age: 14,
      facility: 'Training Ground A',
      session: 'Basic Skills',
      coach: 'Lisa Wilson',
      status: 'Active',
      fees: 320,
    },
    {
      id: 3,
      name: 'Tom Wilson',
      age: 15,
      facility: 'Indoor Court',
      session: 'Goalkeeper Training',
      coach: 'David Brown',
      status: 'Inactive',
      fees: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      case 'Transferred':
        return <Badge className="bg-blue-100 text-blue-700">Transferred</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFeesBadge = (fees: number) => {
    if (fees > 0) {
      return <Badge className="bg-red-100 text-red-700">${fees}</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Student Management" userRole="Administrator" userName="John Smith" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Students</h2>
            <p className="text-gray-600">Total: {students.length} students</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Coach</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Outstanding Fees</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.facility}</TableCell>
                    <TableCell>{student.session}</TableCell>
                    <TableCell>{student.coach}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{getFeesBadge(student.fees)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserX className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentManagement;
