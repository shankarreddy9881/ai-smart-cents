import { StatsCard } from "@/components/ui/stats-card";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { mockMonthlyStats, mockGoals, mockAlerts, mockExpenses } from "@/utils/mockData";
import { generateSpendingPredictions } from "@/utils/predictiveAnalytics";

export default function Dashboard() {
  const stats = mockMonthlyStats;
  const goals = mockGoals.slice(0, 3); // Show top 3 goals
  const recentAlerts = mockAlerts.filter(alert => !alert.isRead).slice(0, 2);
  const predictions = generateSpendingPredictions(mockExpenses);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your financial overview for this month.
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Calendar className="mr-1 h-3 w-3" />
          January 2024
        </Badge>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Income"
          value={`₹${stats.totalIncome.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Expenses"
          value={`₹${stats.totalExpenses.toLocaleString()}`}
          change="+8% from last month"
          changeType="negative"
          icon={Wallet}
        />
        <StatsCard
          title="Savings"
          value={`₹${stats.savings.toLocaleString()}`}
          change="+₹2,400 this month"
          changeType="positive"
          icon={Target}
        />
        <StatsCard
          title="Savings Rate"
          value={`${((stats.savings / stats.totalIncome) * 100).toFixed(1)}%`}
          change="Target: 20%"
          changeType="neutral"
          icon={ArrowUpRight}
        />
      </div>

      {/* Alerts */}
      {recentAlerts.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Recent Alerts</h2>
          {recentAlerts.map((alert) => (
            <Alert key={alert.id} className={
              alert.severity === 'high' ? 'border-expense' : 
              alert.severity === 'medium' ? 'border-warning' : 'border-muted'
            }>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{alert.title}:</strong> {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart data={stats.expensesByCategory} />
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {daysLeft} days left
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Spending Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Spending Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.slice(0, 3).map((prediction) => (
              <div key={prediction.category} className="p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{prediction.category}</span>
                  <Badge variant={
                    prediction.trend === 'increasing' ? 'destructive' :
                    prediction.trend === 'decreasing' ? 'default' : 'secondary'
                  }>
                    {prediction.trend === 'increasing' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                    {prediction.trend === 'decreasing' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {prediction.trend}
                  </Badge>
                </div>
                <div className="text-xl font-bold">₹{prediction.predictedAmount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {(prediction.confidence * 100).toFixed(0)}% confidence
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}