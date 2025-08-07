import { type Restaurant, type MenuItem, type Order, type ChatMessage, type InsertRestaurant, type InsertMenuItem, type InsertOrder, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Menu Items
  getMenuItems(restaurantId: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  
  // Orders
  getOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Chat Messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Search
  searchRestaurants(query: string): Promise<Restaurant[]>;
  searchMenuItems(query: string): Promise<MenuItem[]>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<string, Restaurant>;
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.chatMessages = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed restaurants
    const sampleRestaurants: Restaurant[] = [
      {
        id: "1",
        name: "Tokyo Sushi Bar",
        cuisine: "Japanese • Sushi • Asian",
        rating: "4.8",
        deliveryTime: "25-40 min",
        deliveryFee: "2.99",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isOpen: true,
      },
      {
        id: "2",
        name: "Mario's Pizzeria",
        cuisine: "Italian • Pizza • Pasta",
        rating: "4.6",
        deliveryTime: "20-35 min",
        deliveryFee: "1.99",
        image: "https://pixabay.com/get/g180155c5f96c08eab4d03c853fc8a3226fe86851cf76dd85d54918b957de57082b6c1306ba29d57d36e68c65ff0fff23f2d2ea68ca289c8f523c7309c7ed30df_1280.jpg",
        isOpen: true,
      },
      {
        id: "3",
        name: "Burger Palace",
        cuisine: "American • Burgers • Fast Food",
        rating: "4.7",
        deliveryTime: "15-25 min",
        deliveryFee: "0.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isOpen: true,
      },
      {
        id: "4",
        name: "Green Garden",
        cuisine: "Healthy • Salads • Vegan",
        rating: "4.9",
        deliveryTime: "10-20 min",
        deliveryFee: "1.49",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isOpen: true,
      },
    ];

    const sampleMenuItems: MenuItem[] = [
      // Tokyo Sushi Bar items
      {
        id: "m1",
        restaurantId: "1",
        name: "Salmon Avocado Roll",
        description: "Fresh salmon and avocado wrapped in seasoned rice and nori",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Sushi Rolls",
        isAvailable: true,
      },
      {
        id: "m2",
        restaurantId: "1",
        name: "Spicy Tuna Roll",
        description: "Spicy tuna mix with cucumber and sesame seeds",
        price: "14.99",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Sushi Rolls",
        isAvailable: true,
      },
      // Mario's Pizzeria items
      {
        id: "m3",
        restaurantId: "2",
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
        price: "16.99",
        image: "https://pixabay.com/get/g180155c5f96c08eab4d03c853fc8a3226fe86851cf76dd85d54918b957de57082b6c1306ba29d57d36e68c65ff0fff23f2d2ea68ca289c8f523c7309c7ed30df_1280.jpg",
        category: "Pizza",
        isAvailable: true,
      },
      {
        id: "m4",
        restaurantId: "2",
        name: "Pepperoni Pizza",
        description: "Traditional pepperoni pizza with mozzarella cheese",
        price: "18.99",
        image: "https://pixabay.com/get/g180155c5f96c08eab4d03c853fc8a3226fe86851cf76dd85d54918b957de57082b6c1306ba29d57d36e68c65ff0fff23f2d2ea68ca289c8f523c7309c7ed30df_1280.jpg",
        category: "Pizza",
        isAvailable: true,
      },
      // Burger Palace items
      {
        id: "m5",
        restaurantId: "3",
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, onion, and special sauce",
        price: "13.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Burgers",
        isAvailable: true,
      },
      {
        id: "m6",
        restaurantId: "3",
        name: "BBQ Bacon Burger",
        description: "Beef patty with BBQ sauce, bacon, and crispy onions",
        price: "16.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Burgers",
        isAvailable: true,
      },
      // Green Garden items
      {
        id: "m7",
        restaurantId: "4",
        name: "Quinoa Power Bowl",
        description: "Quinoa with roasted vegetables, avocado, and tahini dressing",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Bowls",
        isAvailable: true,
      },
      {
        id: "m8",
        restaurantId: "4",
        name: "Mediterranean Wrap",
        description: "Hummus, vegetables, and falafel in a whole wheat wrap",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        category: "Wraps",
        isAvailable: true,
      },
    ];

    sampleRestaurants.forEach(restaurant => {
      this.restaurants.set(restaurant.id, restaurant);
    });

    sampleMenuItems.forEach(item => {
      this.menuItems.set(item.id, item);
    });
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = { 
      ...insertRestaurant, 
      id,
      isOpen: insertRestaurant.isOpen ?? true
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.restaurantId === restaurantId
    );
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = { 
      ...insertMenuItem, 
      id,
      description: insertMenuItem.description ?? null,
      isAvailable: insertMenuItem.isAvailable ?? true
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async getOrders(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.userId === userId
    );
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async searchRestaurants(query: string): Promise<Restaurant[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.restaurants.values()).filter(restaurant =>
      restaurant.name.toLowerCase().includes(lowercaseQuery) ||
      restaurant.cuisine.toLowerCase().includes(lowercaseQuery)
    );
  }

  async searchMenuItems(query: string): Promise<MenuItem[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.menuItems.values()).filter(item =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
