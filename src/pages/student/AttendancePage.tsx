import React, { useState } from 'react';
import { Calendar, Filter, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const AttendancePage = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('2024');

  const attendanceRecords = [
    { id: 1, date: '2024-03-10', session: 'Technical Skills', coach: 'Coach Martinez', status: 'Present', time: '2:00 PM' },
    { id: 2, date: '2024-03-08', session: 'Fitness Training', coach: 'Coach Johnson', status: 'Present', time: '4:00 PM' },
    { id: 3, date: '2024-03-06', session: 'Tactical Analysis', coach: 'Coach Davis', status: 'Absent', time: '10:00 AM' },
    { id: 4, date: '2024-03-04', session: 'Technical Skills', coach: 'Coach Martinez', status: 'Present', time: '2:00 PM' },
    { id: 5, date: '2024-03-01', session: 'Fitness Training', coach: 'Coach Johnson', status: 'Present', time: '4:00 PM' },
    { id: 6, date: '2024-02-28', session: 'Match Practice', coach: 'Coach Davis', status: 'Present', time: '5:00 PM' },
    { id: 7, date: '2024-02-26', session: 'Technical Skills', coach: 'Coach Martinez', status: 'Late', time: '2:00 PM' },
    { id: 8, date: '2024-02-23', session: 'Fitness Training', coach: 'Coach Johnson', status: 'Present', time: '4:00 PM' },
  ];

  const getFilteredRecords = () => {
    let filtered = attendanceRecords;

    if (filterPeriod === 'month' && filterMonth) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === parseInt(filterMonth) - 1 && recordDate.getFullYear() === parseInt(filterYear);
      });
    } else if (filterPeriod === 'year') {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getFullYear() === parseInt(filterYear);
      });
    }

    return filtered;
  };

  const filteredRecords = getFilteredRecords();
  const totalSessions = filteredRecords.length;
  const presentSessions = filteredRecords.filter(r => r.status === 'Present').length;
  const attendancePercentage = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Attendance" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Attendance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            title="Overall Attendance"
            value="94%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Sessions This Month"
            value="12"
            icon={Calendar}
          />
          <MetricCard
            title="Perfect Months"
            value="3"
            icon={Clock}
          />
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">By Month</SelectItem>
                  <SelectItem value="year">By Year</SelectItem>
                </SelectContent>
              </Select>

              {filterPeriod === 'month' && (
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  Filtered Attendance: {attendancePercentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{record.session}</h4>
                      <p className="text-sm text-gray-600">{record.coach}</p>
                      <p className="text-xs text-gray-500">{record.date} at {record.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge 
                      status={record.status === 'Present' ? 'active' : 
                              record.status === 'Late' ? 'warning' : 'inactive'}
                      text={record.status}
                    />
                  </div>
                </div>
              ))}
              {filteredRecords.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No attendance records found for the selected period.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;