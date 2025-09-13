import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExpenseCategory } from '@/types/finance';

interface ExpenseChartProps {
  data: Record<ExpenseCategory, number>;
}

const COLORS = {
  Food: 'hsl(142 70% 45%)',
  Transport: 'hsl(200 95% 48%)',
  Education: 'hsl(45 93% 47%)',
  Entertainment: 'hsl(280 70% 50%)',
  Bills: 'hsl(0 84% 60%)',
  Shopping: 'hsl(320 70% 50%)',
  Health: 'hsl(160 70% 45%)',
  Miscellaneous: 'hsl(220 8% 46%)',
};

export function ExpenseChart({ data }: ExpenseChartProps) {
  const chartData = Object.entries(data)
    .filter(([, value]) => value > 0)
    .map(([category, value]) => ({
      name: category,
      value,
      color: COLORS[category as ExpenseCategory]
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`₹${value}`, 'Amount']}
          labelStyle={{ color: 'hsl(220 10% 15%)' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}