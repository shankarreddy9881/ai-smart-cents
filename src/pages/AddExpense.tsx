import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Sparkles, Check } from "lucide-react";
import { ExpenseCategory } from "@/types/finance";
import { categorizeExpense, getCategoryConfidence } from "@/utils/expenseCategorizationAI";

const categories: ExpenseCategory[] = [
  'Food', 'Transport', 'Education', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Miscellaneous'
];

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | "">("");
  const [suggestedCategory, setSuggestedCategory] = useState<ExpenseCategory | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeDescription = async () => {
    if (!description.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const category = categorizeExpense(description);
    const conf = getCategoryConfidence(description, category);
    
    setSuggestedCategory(category);
    setConfidence(conf);
    setIsAnalyzing(false);
    
    toast({
      title: "AI Analysis Complete",
      description: `Suggested category: ${category} (${(conf * 100).toFixed(0)}% confidence)`,
    });
  };

  const acceptSuggestion = () => {
    if (suggestedCategory) {
      setSelectedCategory(suggestedCategory);
      setSuggestedCategory(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally save to backend/local storage
    toast({
      title: "Expense Added Successfully!",
      description: `₹${amount} expense for ${selectedCategory} has been recorded.`,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setSelectedCategory("");
    setSuggestedCategory(null);
    setConfidence(0);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PlusCircle className="h-8 w-8 text-primary" />
          Add New Expense
        </h1>
        <p className="text-muted-foreground mt-2">
          Record your expenses and let AI help categorize them automatically.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ExpenseCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="What did you spend on? (e.g., Lunch at campus cafeteria)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={analyzeDescription}
                  disabled={!description.trim() || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isAnalyzing ? "Analyzing..." : "AI Categorize"}
                </Button>
              </div>
            </div>

            {suggestedCategory && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">AI Suggestion:</span>
                  <Badge variant="secondary">
                    {(confidence * 100).toFixed(0)}% confidence
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary">
                    {suggestedCategory}
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    onClick={acceptSuggestion}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    Accept
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Add Suggestions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { desc: "Coffee", amount: "50", cat: "Food" },
              { desc: "Bus fare", amount: "20", cat: "Transport" },
              { desc: "Lunch", amount: "120", cat: "Food" },
              { desc: "Movie ticket", amount: "200", cat: "Entertainment" },
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setAmount(item.amount);
                  setDescription(item.desc);
                  setSelectedCategory(item.cat as ExpenseCategory);
                }}
                className="text-left justify-start"
              >
                <div>
                  <div className="font-medium">₹{item.amount}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}