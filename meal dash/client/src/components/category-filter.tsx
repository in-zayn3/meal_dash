import { Button } from "@/components/ui/button";
import { Utensils, Pizza, Sandwich, Fish, Carrot, Leaf } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All", icon: Utensils },
  { id: "pizza", name: "Pizza", icon: Pizza },
  { id: "burgers", name: "Burgers", icon: Sandwich },
  { id: "sushi", name: "Sushi", icon: Fish },
  { id: "mexican", name: "Mexican", icon: Carrot },
  { id: "healthy", name: "Healthy", icon: Leaf },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              variant={isSelected ? "default" : "outline"}
              className={`flex-shrink-0 flex flex-col items-center p-4 min-w-[80px] h-auto ${
                isSelected
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary"
              }`}
            >
              <Icon className="w-5 h-5 mb-2" />
              <span className="text-xs font-medium">{category.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
