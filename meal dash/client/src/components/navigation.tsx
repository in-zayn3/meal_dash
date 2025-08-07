import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, MapPin, User, Menu, Home, ShoppingBag, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">FoodHub</h1>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </form>
          </div>
          
          {/* Location & User */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>123 Main St, New York</span>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search restaurants or food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </form>
      </div>
    </nav>
  );
}

export function MobileNavigation() {
  const { getCartItemCount, openCart } = useCart();
  const [location] = useLocation();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="grid grid-cols-4 h-16">
        <Link href="/">
          <Button
            variant="ghost"
            className={`flex flex-col items-center justify-center space-y-1 h-full ${
              location === "/" ? "text-primary" : "text-gray-500 hover:text-primary"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Button>
        </Link>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors h-full"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs">Search</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={openCart}
          className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors h-full"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                {cartItemCount}
              </Badge>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-primary transition-colors h-full"
        >
          <Receipt className="w-5 h-5" />
          <span className="text-xs">Orders</span>
        </Button>
      </div>
    </nav>
  );
}
