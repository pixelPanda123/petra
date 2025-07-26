import React, { useState } from 'react';
import { DollarSign, Clock, AlertTriangle, CreditCard, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Header from '@/components/layout/Header';

const FeePage = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const paymentHistory = [
    {
      id: 1,
      date: '2024-03-01',
      amount: 2500,
      method: 'UPI',
      status: 'paid',
      description: 'Monthly Training Fee - March 2024',
      receiptNo: 'RCP-2024-003-001'
    },
    {
      id: 2,
      date: '2024-02-01',
      amount: 2500,
      method: 'Credit Card',
      status: 'paid',
      description: 'Monthly Training Fee - February 2024',
      receiptNo: 'RCP-2024-002-001'
    },
    {
      id: 3,
      date: '2024-01-01',
      amount: 2500,
      method: 'Bank Transfer',
      status: 'paid',
      description: 'Monthly Training Fee - January 2024',
      receiptNo: 'RCP-2024-001-001'
    },
    {
      id: 4,
      date: '2023-12-15',
      amount: 1200,
      method: 'UPI',
      status: 'paid',
      description: 'Equipment Fee',
      receiptNo: 'RCP-2023-012-002'
    },
    {
      id: 5,
      date: '2023-12-01',
      amount: 2500,
      method: 'Credit Card',
      status: 'paid',
      description: 'Monthly Training Fee - December 2023',
      receiptNo: 'RCP-2023-012-001'
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      amount: 2500,
      dueDate: '2024-04-01',
      description: 'Monthly Training Fee - April 2024',
      isOverdue: false
    },
    {
      id: 2,
      amount: 800,
      dueDate: '2024-04-15',
      description: 'Tournament Registration Fee',
      isOverdue: false
    }
  ];

  // Check for overdue payments
  const hasOverduePayments = upcomingPayments.some(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    return dueDate < today;
  });

  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const totalDue = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFilteredPayments = () => {
    if (filterPeriod === 'all') return paymentHistory;
    
    const now = new Date();
    let startDate = new Date();
    
    switch (filterPeriod) {
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return paymentHistory;
    }
    
    return paymentHistory.filter(payment => new Date(payment.date) >= startDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Fee & Payments" userRole="Student" userName="Alex Rodriguez" />
      
      <div className="p-4 md:p-6">
        {/* Overdue Alert */}
        {hasOverduePayments && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              You have overdue payments. Please settle them as soon as possible to avoid interruption of services.
            </AlertDescription>
          </Alert>
        )}

        {/* Fee Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Current Status"
            value="Paid"
            icon={DollarSign}
          />
          <MetricCard
            title="Next Payment"
            value={formatCurrency(upcomingPayments[0]?.amount || 0)}
            icon={Clock}
          />
          <MetricCard
            title="Due Date"
            value={getDaysUntilDue(upcomingPayments[0]?.dueDate || '') + " days"}
            icon={Calendar}
          />
          <MetricCard
            title="Total Paid This Year"
            value={formatCurrency(totalPaid)}
            icon={CreditCard}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => {
                  const daysUntilDue = getDaysUntilDue(payment.dueDate);
                  const isUrgent = daysUntilDue <= 7;
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <div key={payment.id} className={`p-4 rounded-lg border ${
                      isOverdue ? 'bg-red-50 border-red-200' : 
                      isUrgent ? 'bg-yellow-50 border-yellow-200' : 
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{payment.description}</h4>
                          <p className="text-sm text-gray-600">Due: {formatDate(payment.dueDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                          <StatusBadge 
                            status={isOverdue ? 'overdue' : isUrgent ? 'due' : 'active'}
                            text={isOverdue ? 'Overdue' : isUrgent ? 'Due Soon' : `${daysUntilDue} days`}
                          />
                        </div>
                      </div>
                      <Button className="w-full mt-2" variant={isOverdue || isUrgent ? 'default' : 'outline'}>
                        Pay Now
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-green-800">Total Paid</p>
                      <p className="text-xs text-green-700">This Year</p>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(totalPaid)}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Total Due</p>
                      <p className="text-xs text-yellow-700">Upcoming</p>
                    </div>
                    <p className="text-2xl font-bold text-yellow-900">{formatCurrency(totalDue)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button variant="outline" className="flex items-center justify-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Auto-Pay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getFilteredPayments().map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{payment.description}</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(payment.date)} • {payment.method} • Receipt: {payment.receiptNo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div>
                      <p className="font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                      <StatusBadge status="paid" text="Paid" />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {getFilteredPayments().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No payment records found for the selected period.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeePage;