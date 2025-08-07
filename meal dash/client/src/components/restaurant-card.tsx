import { Link } from "wouter";
import { Clock, Bike, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@shared/schema";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer animate-fade-in">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-xl"
          loading="lazy"
        />
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-warning fill-current" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bike className="w-4 h-4 text-muted-foreground" />
              <span>${restaurant.deliveryFee}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
