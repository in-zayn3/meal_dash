import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, Bike, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/menu-item";
import { api } from "@/lib/api";
import { MenuItem } from "@shared/schema";
import { Link } from "wouter";

export default function Restaurant() {
  const params = useParams();
  const restaurantId = params.id as string;

  const { data: restaurant, isLoading: restaurantLoading } = useQuery({
    queryKey: ["/api/restaurants", restaurantId],
    queryFn: () => api.restaurants.getById(restaurantId),
    enabled: !!restaurantId,
  });

  const { data: menuItems = [], isLoading: menuLoading } = useQuery({
    queryKey: ["/api/restaurants", restaurantId, "menu"],
    queryFn: () => api.restaurants.getMenu(restaurantId),
    enabled: !!restaurantId,
  });

  if (restaurantLoading || menuLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Restaurant not found</h3>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-20 md:mb-0">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-4 p-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Restaurants
        </Button>
      </Link>

      {/* Restaurant Header */}
      <div className="relative mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-3">{restaurant.cuisine}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-warning fill-current" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bike className="w-5 h-5" />
                <span>${restaurant.deliveryFee} delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      {Object.keys(groupedMenuItems).length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-500 mb-2">No menu items available</h3>
          <p className="text-gray-400">This restaurant hasn't added their menu yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(items as MenuItem[]).map((item: MenuItem) => (
                  <MenuItemCard
                    key={item.id}
                    menuItem={item}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
