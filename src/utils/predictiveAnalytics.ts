import { Expense, SpendingPrediction, ExpenseCategory } from '@/types/finance';

export function generateSpendingPredictions(expenses: Expense[]): SpendingPrediction[] {
  const predictions: SpendingPrediction[] = [];
  const categories: ExpenseCategory[] = ['Food', 'Transport', 'Education', 'Entertainment', 'Bills', 'Shopping', 'Health'];
  
  categories.forEach(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category);
    
    if (categoryExpenses.length === 0) {
      return;
    }
    
    // Simple trend analysis based on recent expenses
    const recentExpenses = categoryExpenses
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5); // Last 5 transactions
    
    const avgAmount = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0) / recentExpenses.length;
    
    // Calculate trend (simple moving average comparison)
    const firstHalf = recentExpenses.slice(0, Math.ceil(recentExpenses.length / 2));
    const secondHalf = recentExpenses.slice(Math.ceil(recentExpenses.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, exp) => sum + exp.amount, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, exp) => sum + exp.amount, 0) / secondHalf.length;
    
    let trend: 'increasing' | 'decreasing' | 'stable';
    const trendThreshold = 0.1; // 10% change threshold
    
    if (firstAvg > secondAvg * (1 + trendThreshold)) {
      trend = 'increasing';
    } else if (firstAvg < secondAvg * (1 - trendThreshold)) {
      trend = 'decreasing';
    } else {
      trend = 'stable';
    }
    
    // Apply trend factor to prediction
    let predictedAmount = avgAmount;
    if (trend === 'increasing') {
      predictedAmount *= 1.15; // 15% increase
    } else if (trend === 'decreasing') {
      predictedAmount *= 0.9; // 10% decrease
    }
    
    // Confidence based on data availability and variance
    const variance = recentExpenses.reduce((sum, exp) => 
      sum + Math.pow(exp.amount - avgAmount, 2), 0) / recentExpenses.length;
    const coefficientOfVariation = Math.sqrt(variance) / avgAmount;
    const confidence = Math.max(0.3, Math.min(0.95, 1 - coefficientOfVariation));
    
    predictions.push({
      category,
      predictedAmount: Math.round(predictedAmount),
      confidence: Math.round(confidence * 100) / 100,
      trend
    });
  });
  
  return predictions.sort((a, b) => b.predictedAmount - a.predictedAmount);
}

export function detectUnusualSpending(expenses: Expense[], category: ExpenseCategory): boolean {
  const categoryExpenses = expenses
    .filter(exp => exp.category === category)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  if (categoryExpenses.length < 4) return false;
  
  const currentMonth = categoryExpenses.slice(0, 10); // Approximate current month
  const previousData = categoryExpenses.slice(10, 30); // Previous period
  
  if (previousData.length === 0) return false;
  
  const currentAvg = currentMonth.reduce((sum, exp) => sum + exp.amount, 0) / currentMonth.length;
  const previousAvg = previousData.reduce((sum, exp) => sum + exp.amount, 0) / previousData.length;
  
  // Flag as unusual if current spending is 50% higher than previous
  return currentAvg > previousAvg * 1.5;
}

export function calculateSavingsRecommendation(
  totalIncome: number, 
  totalExpenses: number
): { recommended: number; achievable: boolean; tips: string[] } {
  const currentSavings = totalIncome - totalExpenses;
  const savingsRate = currentSavings / totalIncome;
  
  // Recommended savings rate for students: 10-20%
  const recommendedRate = 0.15;
  const recommended = totalIncome * recommendedRate;
  const achievable = currentSavings >= recommended * 0.7; // Within 70% is achievable
  
  const tips: string[] = [];
  
  if (savingsRate < 0.05) {
    tips.push("Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings");
    tips.push("Look for student discounts and free activities");
  } else if (savingsRate < 0.1) {
    tips.push("Consider meal planning to reduce food expenses");
    tips.push("Use public transport or bike instead of ride-sharing");
  } else {
    tips.push("Great job! Consider investing your savings for better returns");
    tips.push("Look into high-yield savings accounts for students");
  }
  
  return { recommended: Math.round(recommended), achievable, tips };
}