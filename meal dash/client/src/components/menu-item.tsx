import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@shared/schema";
import { useCart } from "@/contexts/cart-context";

interface MenuItemCardProps {
  menuItem: MenuItem;
  restaurantName: string;
}

export function MenuItemCard({ menuItem, restaurantName }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: parseFloat(menuItem.price),
      restaurantId: menuItem.restaurantId,
      restaurantName,
      image: menuItem.image,
    });
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <img
        src={menuItem.image}
        alt={menuItem.name}
        className="w-full h-32 object-cover rounded-t-xl"
        loading="lazy"
      />
      <CardContent className="p-4">
        <h4 className="font-semibold text-gray-900 mb-1">{menuItem.name}</h4>
        {menuItem.description && (
          <p className="text-sm text-muted-foreground mb-2">{menuItem.description}</p>
        )}
        <p className="text-sm text-muted-foreground mb-2">{restaurantName}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary">${menuItem.price}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-90 transition-colors group-hover:animate-bounce-subtle"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
