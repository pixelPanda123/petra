
import React, { useState } from 'react';
import { Calendar, TrendingUp, DollarSign, Clock, Bell, User, Plus, Trash2, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const StudentDashboard = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Practice dribbling drills', completed: false },
    { id: 2, text: 'Watch tactical analysis video', completed: true },
    { id: 3, text: 'Complete fitness homework', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const upcomingSessions = [
    { id: 1, title: 'Technical Skills', coach: 'Coach Martinez', time: '2:00 PM', date: 'Today' },
    { id: 2, title: 'Fitness Training', coach: 'Coach Johnson', time: '4:00 PM', date: 'Tomorrow' },
    { id: 3, title: 'Tactical Analysis', coach: 'Coach Davis', time: '10:00 AM', date: 'Friday' },
  ];

  const youtubeVideos = [
    { id: 1, title: 'Barcelona vs Real Madrid - Tactical Analysis', url: 'https://youtube.com/watch?v=example1', coach: 'Coach Martinez' },
    { id: 2, title: 'Messi Dribbling Masterclass', url: 'https://youtube.com/watch?v=example2', coach: 'Coach Johnson' },
    { id: 3, title: 'Defensive Positioning Drills', url: 'https://youtube.com/watch?v=example3', coach: 'Coach Davis' },
  ];

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Dashboard" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Next Session"
            value="2:00 PM"
            icon={Clock}
          />
          <MetricCard
            title="Attendance Rate"
            value="94%"
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Performance Score"
            value="8.2/10"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
          <MetricCard
            title="Fee Status"
            value="Paid"
            icon={DollarSign}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Sessions</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.coach}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{session.time}</p>
                        <p className="text-xs text-gray-500">{session.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Fee Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Next Payment Due</p>
                  <p className="text-lg font-bold text-yellow-900">₹2,500</p>
                  <p className="text-xs text-yellow-700">Due: March 15, 2024</p>
                </div>
                <Button className="w-full" variant="outline">
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* To-Do List and YouTube Videos Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* To-Do List */}
          <Card>
            <CardHeader>
              <CardTitle>My To-Do List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  />
                  <Button onClick={addTodo} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* YouTube Videos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Training Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {youtubeVideos.map((video) => (
                  <div key={video.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{video.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">by {video.coach}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">My Sessions</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Performance</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="h-6 w-6 mb-2" />
                <span className="text-sm">Payments</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm">Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
