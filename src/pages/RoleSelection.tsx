
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Users, UserCheck, Shield } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage students, coaches, facilities, and system settings',
      icon: Shield,
      color: 'bg-blue-500',
      path: '/admin'
    },
    {
      id: 'student',
      title: 'Student',
      description: 'View sessions, track progress, and manage payments',
      icon: User,
      color: 'bg-green-500',
      path: '/student'
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Manage sessions, track attendance, and evaluate students',
      icon: UserCheck,
      color: 'bg-purple-500',
      path: '/coach'
    },
    {
      id: 'head-coach',
      title: 'Head Coach',
      description: 'Oversee all operations, manage coaches, and view analytics',
      icon: Users,
      color: 'bg-orange-500',
      path: '/head-coach'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Football Academy</h1>
          <p className="text-lg text-gray-600">Select your role to continue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{role.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => navigate(role.path)}
                >
                  Continue as {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
