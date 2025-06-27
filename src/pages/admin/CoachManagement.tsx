
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Edit, Eye, UserX, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';

const CoachManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const coaches = [
    {
      id: 1,
      name: 'Mike Johnson',
      specialization: 'Technical Training',
      facility: 'Main Field',
      status: 'Active',
      contact: 'mike.johnson@academy.com',
      phone: '+1-555-0123',
    },
    {
      id: 2,
      name: 'Lisa Wilson',
      specialization: 'Youth Development',
      facility: 'Training Ground A',
      status: 'Active',
      contact: 'lisa.wilson@academy.com',
      phone: '+1-555-0124',
    },
    {
      id: 3,
      name: 'David Brown',
      specialization: 'Goalkeeper Training',
      facility: 'Indoor Court',
      status: 'Active',
      contact: 'david.brown@academy.com',
      phone: '+1-555-0125',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Coach Management" userRole="Administrator" userName="John Smith" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Coaches</h2>
            <p className="text-gray-600">Total: {coaches.length} coaches</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Coach</span>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search coaches..."
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coach List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coaches.map((coach) => (
                  <TableRow key={coach.id}>
                    <TableCell className="font-medium">{coach.name}</TableCell>
                    <TableCell>{coach.specialization}</TableCell>
                    <TableCell>{coach.facility}</TableCell>
                    <TableCell>{getStatusBadge(coach.status)}</TableCell>
                    <TableCell>{coach.contact}</TableCell>
                    <TableCell>{coach.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserX className="h-4 w-4" />
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

export default CoachManagement;
