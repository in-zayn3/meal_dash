import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CategoryFilter } from "@/components/category-filter";
import { RestaurantCard } from "@/components/restaurant-card";
import { MenuItemCard } from "@/components/menu-item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Restaurant, MenuItem } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery({
    queryKey: ["/api/restaurants"],
    queryFn: api.restaurants.getAll,
  });

  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["/api/search/restaurants", searchQuery],
    queryFn: () => api.restaurants.search(searchQuery),
    enabled: !!searchQuery,
  });

  const { data: trendingItems = [], isLoading: trendingLoading } = useQuery({
    queryKey: ["/api/search/menu-items", "trending"],
    queryFn: () => api.menuItems.search("popular"),
  });

  const displayRestaurants = searchQuery ? searchResults : restaurants;

  const filteredRestaurants = displayRestaurants.filter((restaurant: Restaurant) => {
    if (selectedCategory === "all") return true;
    
    const cuisine = restaurant.cuisine.toLowerCase();
    switch (selectedCategory) {
      case "pizza":
        return cuisine.includes("pizza") || cuisine.includes("italian");
      case "burgers":
        return cuisine.includes("burger") || cuisine.includes("american");
      case "sushi":
        return cuisine.includes("sushi") || cuisine.includes("japanese");
      case "mexican":
        return cuisine.includes("mexican");
      case "healthy":
        return cuisine.includes("healthy") || cuisine.includes("salad") || cuisine.includes("vegan");
      default:
        return true;
    }
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a: Restaurant, b: Restaurant) => {
    switch (sortBy) {
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "delivery-time":
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case "distance":
        return parseFloat(a.deliveryFee) - parseFloat(b.deliveryFee);
      default:
        return parseFloat(b.rating) - parseFloat(a.rating);
    }
  });

  if (restaurantsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-20 md:mb-0">
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Restaurant Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Restaurants"}
          </h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Sort by: Popular</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="delivery-time">Delivery Time</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              {searchQuery ? "No restaurants found" : "No restaurants available"}
            </h3>
            <p className="text-gray-400">
              {searchQuery ? "Try adjusting your search terms" : "Check back later for more options"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedRestaurants.map((restaurant: Restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>

      {/* Trending Items */}
      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Items</h2>
          {trendingLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(trendingItems) && trendingItems.slice(0, 4).map((item: MenuItem) => {
                const restaurant = restaurants.find((r: Restaurant) => r.id === item.restaurantId);
                return (
                  <MenuItemCard
                    key={item.id}
                    menuItem={item}
                    restaurantName={restaurant?.name || "Unknown Restaurant"}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
