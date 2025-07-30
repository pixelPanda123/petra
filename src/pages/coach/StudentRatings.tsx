import React, { useState } from 'react';
import { Star, User, Search, Filter, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';

const StudentRatings = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSession, setFilterSession] = useState('');
  
  const [ratings, setRatings] = useState({
    technical: [75],
    tactical: [70],
    physical: [80],
    mental: [65]
  });
  
  const [comments, setComments] = useState('');

  const students = [
    { 
      id: '1', 
      name: 'Alex Rodriguez', 
      age: 16, 
      session: 'Technical Skills',
      underMyCoaching: true,
      lastRating: { technical: 75, tactical: 70, physical: 80, mental: 65, date: '2024-01-15' }
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      age: 15, 
      session: 'Youth Development',
      underMyCoaching: true,
      lastRating: { technical: 80, tactical: 75, physical: 70, mental: 85, date: '2024-01-10' }
    },
    { 
      id: '3', 
      name: 'Mike Chen', 
      age: 17, 
      session: 'Advanced Training',
      underMyCoaching: false,
      lastRating: { technical: 85, tactical: 80, physical: 90, mental: 75, date: '2024-01-12' }
    },
    { 
      id: '4', 
      name: 'Emma Wilson', 
      age: 16, 
      session: 'Technical Skills',
      underMyCoaching: true,
      lastRating: { technical: 70, tactical: 65, physical: 75, mental: 80, date: '2024-01-08' }
    },
  ];

  const sessions = ['Technical Skills', 'Youth Development', 'Advanced Training', 'Tactical Training'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSession = !filterSession || student.session === filterSession;
    return matchesSearch && matchesSession;
  });

  const handleRatingChange = (category: string, value: number[]) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmitRating = () => {
    const student = students.find(s => s.id === selectedStudent);
    console.log('Submitting rating for:', student?.name, {
      ratings,
      comments,
      date: new Date().toISOString()
    });
    // Handle rating submission
    setComments('');
    setSelectedStudent('');
  };

  const getRatingColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAverageRating = (student: any) => {
    const { technical, tactical, physical, mental } = student.lastRating;
    return Math.round((technical + tactical + physical + mental) / 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Student Ratings" userRole="Coach" userName="Coach Martinez" />
      
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Students
              </CardTitle>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterSession} onValueChange={setFilterSession}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sessions</SelectItem>
                    {sessions.map(session => (
                      <SelectItem key={session} value={session}>
                        {session}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map(student => (
                  <div 
                    key={student.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedStudent === student.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{student.name}</h4>
                          {student.underMyCoaching ? (
                            <Badge variant="default" className="text-xs">My Student</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Guest Rating</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Age: {student.age} • {student.session}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last rated: {student.lastRating.date}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getRatingColor(getAverageRating(student))}`}>
                          {getAverageRating(student)}
                        </div>
                        <div className="text-xs text-gray-500">Average</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Rate Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStudent ? (
                <div className="space-y-6">
                  {/* Selected Student Info */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium">
                      {students.find(s => s.id === selectedStudent)?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {students.find(s => s.id === selectedStudent)?.session}
                    </p>
                  </div>

                  {/* Rating Sliders */}
                  <div className="space-y-4">
                    {Object.entries(ratings).map(([category, value]) => (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium capitalize">
                            {category} Skills
                          </label>
                          <span className="text-sm font-bold text-blue-600">
                            {value[0]}/100
                          </span>
                        </div>
                        <Slider
                          value={value}
                          onValueChange={(newValue) => handleRatingChange(category, newValue)}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Comments & Observations
                    </label>
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Provide detailed feedback on the student's performance..."
                      rows={4}
                    />
                  </div>

                  {/* Previous Ratings Comparison */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium mb-2">Previous Ratings</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(students.find(s => s.id === selectedStudent)?.lastRating || {})
                        .filter(([key]) => key !== 'date')
                        .map(([category, score]) => (
                        <div key={category} className="flex justify-between">
                          <span className="capitalize">{category}:</span>
                          <span className={getRatingColor(score as number)}>
                            {score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSubmitRating} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Submit Rating
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a student to rate their performance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRatings;