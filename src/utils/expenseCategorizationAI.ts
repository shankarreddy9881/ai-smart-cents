import { ExpenseCategory } from '@/types/finance';

// Simple rule-based categorization with keyword matching
// In a real app, this would use the Hugging Face transformers for NLP
export function categorizeExpense(description: string): ExpenseCategory {
  const desc = description.toLowerCase();
  
  // Food keywords
  if (desc.includes('food') || desc.includes('restaurant') || desc.includes('cafe') || 
      desc.includes('lunch') || desc.includes('dinner') || desc.includes('breakfast') ||
      desc.includes('snack') || desc.includes('grocery') || desc.includes('meal') ||
      desc.includes('pizza') || desc.includes('burger') || desc.includes('coffee')) {
    return 'Food';
  }
  
  // Transport keywords
  if (desc.includes('bus') || desc.includes('train') || desc.includes('uber') ||
      desc.includes('taxi') || desc.includes('metro') || desc.includes('fuel') ||
      desc.includes('petrol') || desc.includes('transport') || desc.includes('travel') ||
      desc.includes('flight') || desc.includes('parking')) {
    return 'Transport';
  }
  
  // Education keywords
  if (desc.includes('book') || desc.includes('course') || desc.includes('tuition') ||
      desc.includes('fees') || desc.includes('school') || desc.includes('college') ||
      desc.includes('university') || desc.includes('study') || desc.includes('exam') ||
      desc.includes('notebook') || desc.includes('pen') || desc.includes('stationery')) {
    return 'Education';
  }
  
  // Entertainment keywords
  if (desc.includes('movie') || desc.includes('game') || desc.includes('music') ||
      desc.includes('concert') || desc.includes('party') || desc.includes('club') ||
      desc.includes('netflix') || desc.includes('spotify') || desc.includes('entertainment') ||
      desc.includes('fun') || desc.includes('hobby')) {
    return 'Entertainment';
  }
  
  // Bills keywords
  if (desc.includes('electricity') || desc.includes('water') || desc.includes('internet') ||
      desc.includes('phone') || desc.includes('rent') || desc.includes('bill') ||
      desc.includes('subscription') || desc.includes('insurance') || desc.includes('utility')) {
    return 'Bills';
  }
  
  // Shopping keywords
  if (desc.includes('clothes') || desc.includes('shopping') || desc.includes('shirt') ||
      desc.includes('shoes') || desc.includes('bag') || desc.includes('accessory') ||
      desc.includes('fashion') || desc.includes('store') || desc.includes('mall')) {
    return 'Shopping';
  }
  
  // Health keywords
  if (desc.includes('doctor') || desc.includes('medicine') || desc.includes('hospital') ||
      desc.includes('pharmacy') || desc.includes('health') || desc.includes('medical') ||
      desc.includes('gym') || desc.includes('fitness') || desc.includes('checkup')) {
    return 'Health';
  }
  
  // Default to miscellaneous
  return 'Miscellaneous';
}

export function getCategoryConfidence(description: string, category: ExpenseCategory): number {
  // Simple confidence scoring based on keyword matches
  const desc = description.toLowerCase();
  const categoryKeywords = getCategoryKeywords(category);
  
  const matches = categoryKeywords.filter(keyword => desc.includes(keyword)).length;
  return Math.min(matches * 0.3 + 0.4, 1.0); // Base confidence of 40% + matches
}

function getCategoryKeywords(category: ExpenseCategory): string[] {
  const keywordMap: Record<ExpenseCategory, string[]> = {
    Food: ['food', 'restaurant', 'cafe', 'lunch', 'dinner', 'grocery', 'meal'],
    Transport: ['bus', 'train', 'uber', 'taxi', 'metro', 'fuel', 'transport'],
    Education: ['book', 'course', 'tuition', 'fees', 'school', 'study'],
    Entertainment: ['movie', 'game', 'music', 'concert', 'netflix', 'entertainment'],
    Bills: ['electricity', 'water', 'internet', 'phone', 'rent', 'bill'],
    Shopping: ['clothes', 'shopping', 'shoes', 'bag', 'store', 'mall'],
    Health: ['doctor', 'medicine', 'hospital', 'pharmacy', 'health', 'gym'],
    Miscellaneous: []
  };
  
  return keywordMap[category] || [];
}