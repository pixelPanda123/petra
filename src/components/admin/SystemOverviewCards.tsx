
import React from 'react';
import { Users, UserCheck, Activity, Clock } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';

const SystemOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Students"
        value={127}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Active Coaches"
        value={8}
        icon={UserCheck}
        trend={{ value: 0, isPositive: true }}
      />
      <MetricCard
        title="System Health"
        value="98.5%"
        icon={Activity}
        trend={{ value: 2.1, isPositive: true }}
      />
      <MetricCard
        title="System Uptime"
        value="99.2%"
        icon={Clock}
        trend={{ value: 0.3, isPositive: true }}
      />
    </div>
  );
};

export default SystemOverviewCards;
