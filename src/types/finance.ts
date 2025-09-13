export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  isRecurring?: boolean;
  tags?: string[];
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  description?: string;
  isCompleted: boolean;
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  spent: number;
  alerts: {
    threshold50: boolean;
    threshold75: boolean;
    threshold90: boolean;
  };
}

export interface Alert {
  id: string;
  type: 'budget_exceeded' | 'unusual_spending' | 'goal_reminder' | 'bill_due';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
}

export type ExpenseCategory = 
  | 'Food'
  | 'Transport' 
  | 'Education'
  | 'Entertainment'
  | 'Bills'
  | 'Shopping'
  | 'Health'
  | 'Miscellaneous';

export interface SpendingPrediction {
  category: ExpenseCategory;
  predictedAmount: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface MonthlyStats {
  totalExpenses: number;
  totalIncome: number;
  savings: number;
  topCategory: ExpenseCategory;
  expensesByCategory: Record<ExpenseCategory, number>;
}