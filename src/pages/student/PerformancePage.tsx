import React, { useState } from 'react';
import { TrendingUp, Target, Calendar, Filter, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetricCard from '@/components/ui/MetricCard';
import Header from '@/components/layout/Header';

const PerformancePage = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const performanceHistory = [
    { 
      id: 1, 
      date: '2024-03-10', 
      technical: 8.5, 
      tactical: 7.8, 
      physical: 9.2, 
      psychological: 8.0,
      coach: 'Coach Martinez',
      session: 'Technical Skills Assessment'
    },
    { 
      id: 2, 
      date: '2024-02-15', 
      technical: 7.9, 
      tactical: 7.5, 
      physical: 8.8, 
      psychological: 7.7,
      coach: 'Coach Johnson',
      session: 'Monthly Evaluation'
    },
    { 
      id: 3, 
      date: '2024-01-20', 
      technical: 7.2, 
      tactical: 7.0, 
      physical: 8.5, 
      psychological: 7.3,
      coach: 'Coach Davis',
      session: 'Mid-Season Review'
    },
    { 
      id: 4, 
      date: '2023-12-18', 
      technical: 6.8, 
      tactical: 6.5, 
      physical: 8.2, 
      psychological: 7.0,
      coach: 'Coach Martinez',
      session: 'End of Year Assessment'
    },
  ];

  const latestScore = performanceHistory[0];
  const previousScore = performanceHistory[1];

  const calculateAverage = (scores: any[], period: string = 'all') => {
    let filteredScores = scores;
    
    if (period === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filteredScores = scores.filter(score => new Date(score.date) >= threeMonthsAgo);
    } else if (period === '6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filteredScores = scores.filter(score => new Date(score.date) >= sixMonthsAgo);
    }

    if (filteredScores.length === 0) return {
      technical: '0',
      tactical: '0',
      physical: '0',
      psychological: '0',
      overall: '0'
    };

    const totalTechnical = filteredScores.reduce((sum, score) => sum + score.technical, 0);
    const totalTactical = filteredScores.reduce((sum, score) => sum + score.tactical, 0);
    const totalPhysical = filteredScores.reduce((sum, score) => sum + score.physical, 0);
    const totalPsychological = filteredScores.reduce((sum, score) => sum + score.psychological, 0);

    return {
      technical: (totalTechnical / filteredScores.length).toFixed(1),
      tactical: (totalTactical / filteredScores.length).toFixed(1),
      physical: (totalPhysical / filteredScores.length).toFixed(1),
      psychological: (totalPsychological / filteredScores.length).toFixed(1),
      overall: ((totalTechnical + totalTactical + totalPhysical + totalPsychological) / (filteredScores.length * 4)).toFixed(1)
    };
  };

  const averageScores = calculateAverage(performanceHistory, filterPeriod);

  const ScoreBar = ({ label, current, previous }: { label: string; current: number; previous: number }) => {
    const improvement = current - previous;
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">{current.toFixed(1)}</span>
            <span className={`text-xs ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {improvement >= 0 ? '+' : ''}{improvement.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(current / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Performance" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Latest Overall Score"
            value={`${((latestScore.technical + latestScore.tactical + latestScore.physical + latestScore.psychological) / 4).toFixed(1)}/10`}
            icon={Target}
            trend={{ 
              value: parseFloat(((((latestScore.technical + latestScore.tactical + latestScore.physical + latestScore.psychological) / 4) - 
                               ((previousScore.technical + previousScore.tactical + previousScore.physical + previousScore.psychological) / 4)) * 10).toFixed(1)), 
              isPositive: ((latestScore.technical + latestScore.tactical + latestScore.physical + latestScore.psychological) / 4) > 
                          ((previousScore.technical + previousScore.tactical + previousScore.physical + previousScore.psychological) / 4)
            }}
          />
          <MetricCard
            title="Technical Skills"
            value={`${latestScore.technical}/10`}
            icon={TrendingUp}
          />
          <MetricCard
            title="Physical Fitness"
            value={`${latestScore.physical}/10`}
            icon={BarChart}
          />
          <MetricCard
            title="Evaluations Count"
            value={performanceHistory.length.toString()}
            icon={Calendar}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Performance Score</CardTitle>
              <p className="text-sm text-gray-600">From {latestScore.date} - {latestScore.session}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScoreBar 
                  label="Technical Skills" 
                  current={latestScore.technical} 
                  previous={previousScore.technical} 
                />
                <ScoreBar 
                  label="Tactical Understanding" 
                  current={latestScore.tactical} 
                  previous={previousScore.tactical} 
                />
                <ScoreBar 
                  label="Physical Fitness" 
                  current={latestScore.physical} 
                  previous={previousScore.physical} 
                />
                <ScoreBar 
                  label="Psychological Strength" 
                  current={latestScore.psychological} 
                  previous={previousScore.psychological} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Average Scores */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Average Scores
              </CardTitle>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Overall Average</p>
                  <p className="text-3xl font-bold text-blue-900">{averageScores.overall}/10</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Technical</p>
                    <p className="text-lg font-bold text-gray-900">{averageScores.technical}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Tactical</p>
                    <p className="text-lg font-bold text-gray-900">{averageScores.tactical}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Physical</p>
                    <p className="text-lg font-bold text-gray-900">{averageScores.physical}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Psychological</p>
                    <p className="text-lg font-bold text-gray-900">{averageScores.psychological}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceHistory.map((score, index) => (
                <div key={score.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{score.session}</h4>
                      <p className="text-sm text-gray-600">{score.coach} • {score.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {((score.technical + score.tactical + score.physical + score.psychological) / 4).toFixed(1)}/10
                      </p>
                      <p className="text-xs text-gray-500">Overall</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Technical</p>
                      <p className="font-bold text-gray-900">{score.technical}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Tactical</p>
                      <p className="font-bold text-gray-900">{score.tactical}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Physical</p>
                      <p className="font-bold text-gray-900">{score.physical}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Psychological</p>
                      <p className="font-bold text-gray-900">{score.psychological}</p>
                    </div>
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

export default PerformancePage;