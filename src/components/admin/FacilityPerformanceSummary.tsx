
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MapPin, Users, Calendar, TrendingUp } from 'lucide-react';

const FacilityPerformanceSummary = () => {
  const utilizationData = [
    { facility: 'Main Field', utilization: 85, sessions: 45 },
    { facility: 'Training A', utilization: 70, sessions: 32 },
    { facility: 'Training B', utilization: 65, sessions: 28 },
    { facility: 'Indoor Court', utilization: 55, sessions: 18 },
  ];

  const coachDistribution = [
    { facility: 'Main Field', coaches: 3 },
    { facility: 'Training A', coaches: 2 },
    { facility: 'Training B', coaches: 2 },
    { facility: 'Indoor Court', coaches: 1 },
  ];

  const weeklyForecast = [
    { day: 'Mon', sessions: 12 },
    { day: 'Tue', sessions: 15 },
    { day: 'Wed', sessions: 18 },
    { day: 'Thu', sessions: 14 },
    { day: 'Fri', sessions: 16 },
    { day: 'Sat', sessions: 22 },
    { day: 'Sun', sessions: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">Active Facilities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">123</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Assigned Coaches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-gray-600">Avg Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="facility" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="utilization" fill="#10b981" name="Utilization %" />
              <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Session Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityPerformanceSummary;
