
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, TrendingUp, Settings, Plus, UserCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import FacilityPerformanceSummary from '@/components/admin/FacilityPerformanceSummary';

const FacilityManagement = () => {
  const facilities = [
    {
      id: 1,
      name: 'Main Field',
      address: '123 Sports Complex Ave',
      capacity: 50,
      students: 45,
      sessions: 15,
      completion: 92,
      headCoach: 'Mike Johnson',
    },
    {
      id: 2,
      name: 'Training Ground A',
      address: '456 Academy St',
      capacity: 35,
      students: 32,
      sessions: 12,
      completion: 88,
      headCoach: 'Lisa Wilson',
    },
    {
      id: 3,
      name: 'Training Ground B',
      address: '789 Field Rd',
      capacity: 30,
      students: 28,
      sessions: 10,
      completion: 85,
      headCoach: 'David Brown',
    },
    {
      id: 4,
      name: 'Indoor Court',
      address: '321 Gym Complex',
      capacity: 25,
      students: 18,
      sessions: 8,
      completion: 90,
      headCoach: 'Sarah Davis',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Facility Management" userRole="Administrator" userName="John Smith" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Facility Management</h2>
            <p className="text-gray-600">Monitor and manage academy facilities</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Facility</span>
          </Button>
        </div>

        <FacilityPerformanceSummary />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Facility Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>{facility.name}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{facility.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{facility.students}/{facility.capacity}</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">{facility.sessions}</p>
                        <p className="text-xs text-gray-600">Sessions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{facility.completion}%</p>
                        <p className="text-xs text-gray-600">Completion</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">{facility.headCoach}</p>
                        <p className="text-xs text-gray-600">Head Coach</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit Details</Button>
                    <Button variant="outline" size="sm">Add Session</Button>
                    <Button variant="outline" size="sm">Assign Coach</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;
