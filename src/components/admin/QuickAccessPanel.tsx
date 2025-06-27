
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, UserCheck, Settings, FileText, AlertTriangle } from 'lucide-react';

const QuickAccessPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full flex items-center justify-start space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Student</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Coach</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start space-x-2">
            <Users className="h-4 w-4" />
            <span>User Role Management</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start space-x-2">
            <FileText className="h-4 w-4" />
            <span>System Logs</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">Low attendance alert for Training Ground B</p>
            <p className="text-xs text-yellow-600 mt-1">2 hours ago</p>
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">12 students have overdue payments</p>
            <p className="text-xs text-red-600 mt-1">1 day ago</p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">New coach certification expires in 30 days</p>
            <p className="text-xs text-blue-600 mt-1">3 days ago</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm border-b pb-2">
            <p className="font-medium">New student registered</p>
            <p className="text-gray-500 text-xs">Emma Davis - Main Field</p>
            <p className="text-gray-400 text-xs">5 minutes ago</p>
          </div>
          <div className="text-sm border-b pb-2">
            <p className="font-medium">Payment received</p>
            <p className="text-gray-500 text-xs">John Smith - $450</p>
            <p className="text-gray-400 text-xs">1 hour ago</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Coach assignment updated</p>
            <p className="text-gray-500 text-xs">Mike Johnson - Training Ground A</p>
            <p className="text-gray-400 text-xs">3 hours ago</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickAccessPanel;
