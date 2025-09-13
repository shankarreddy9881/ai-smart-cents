import { Expense, FinancialGoal, Budget, Alert, MonthlyStats } from '@/types/finance';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    amount: 450,
    description: 'Grocery shopping for the week',
    category: 'Food',
    date: new Date('2024-01-15'),
    tags: ['weekly', 'essential']
  },
  {
    id: '2',
    amount: 120,
    description: 'Bus pass for university',
    category: 'Transport',
    date: new Date('2024-01-14'),
    isRecurring: true
  },
  {
    id: '3',
    amount: 2500,
    description: 'Semester textbooks',
    category: 'Education',
    date: new Date('2024-01-12'),
    tags: ['semester', 'books']
  },
  {
    id: '4',
    amount: 350,
    description: 'Movie night with friends',
    category: 'Entertainment',
    date: new Date('2024-01-10'),
  },
  {
    id: '5',
    amount: 800,
    description: 'Monthly internet bill',
    category: 'Bills',
    date: new Date('2024-01-08'),
    isRecurring: true
  }
];

export const mockGoals: FinancialGoal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 3500,
    deadline: new Date('2024-06-30'),
    category: 'Savings',
    description: 'Build an emergency fund for unexpected expenses',
    isCompleted: false
  },
  {
    id: '2',
    title: 'New Laptop',
    targetAmount: 50000,
    currentAmount: 15000,
    deadline: new Date('2024-04-15'),
    category: 'Education',
    description: 'Save for a new laptop for programming courses',
    isCompleted: false
  },
  {
    id: '3',
    title: 'Summer Trip',
    targetAmount: 8000,
    currentAmount: 2000,
    deadline: new Date('2024-05-20'),
    category: 'Entertainment',
    description: 'Plan a summer trip with friends',
    isCompleted: false
  }
];

export const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    monthlyLimit: 5000,
    spent: 3200,
    alerts: { threshold50: true, threshold75: false, threshold90: false }
  },
  {
    id: '2',
    category: 'Transport',
    monthlyLimit: 2000,
    spent: 1800,
    alerts: { threshold50: true, threshold75: true, threshold90: true }
  },
  {
    id: '3',
    category: 'Entertainment',
    monthlyLimit: 3000,
    spent: 1200,
    alerts: { threshold50: false, threshold75: false, threshold90: false }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'budget_exceeded',
    title: 'Transport Budget Alert',
    message: 'You\'ve spent 90% of your monthly transport budget',
    severity: 'high',
    isRead: false,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    type: 'goal_reminder',
    title: 'Laptop Fund Reminder',
    message: 'Only 3 months left to reach your laptop savings goal!',
    severity: 'medium',
    isRead: false,
    createdAt: new Date('2024-01-14T09:00:00')
  },
  {
    id: '3',
    type: 'unusual_spending',
    title: 'Unusual Spending Pattern',
    message: 'Your food expenses are 40% higher than last month',
    severity: 'medium',
    isRead: true,
    createdAt: new Date('2024-01-13T14:15:00')
  }
];

export const mockMonthlyStats: MonthlyStats = {
  totalExpenses: 15420,
  totalIncome: 25000,
  savings: 9580,
  topCategory: 'Food',
  expensesByCategory: {
    Food: 4200,
    Transport: 1800,
    Education: 3500,
    Entertainment: 2100,
    Bills: 2800,
    Shopping: 720,
    Health: 300,
    Miscellaneous: 0
  }
};