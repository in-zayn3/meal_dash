import { apiRequest } from "./queryClient";

export const api = {
  restaurants: {
    getAll: () => fetch("/api/restaurants").then(res => res.json()),
    getById: (id: string) => fetch(`/api/restaurants/${id}`).then(res => res.json()),
    getMenu: (id: string) => fetch(`/api/restaurants/${id}/menu`).then(res => res.json()),
    search: (query: string) => fetch(`/api/search/restaurants?q=${encodeURIComponent(query)}`).then(res => res.json()),
  },
  
  menuItems: {
    search: (query: string) => fetch(`/api/search/menu-items?q=${encodeURIComponent(query)}`).then(res => res.json()),
  },
  
  orders: {
    create: (orderData: any) => apiRequest("POST", "/api/orders", orderData),
    getByUser: (userId: string) => fetch(`/api/orders?userId=${userId}`).then(res => res.json()),
  },
  
  chat: {
    sendMessage: (sessionId: string, message: string) => 
      apiRequest("POST", "/api/chat", { sessionId, message }).then(res => res.json()),
    getHistory: (sessionId: string) => fetch(`/api/chat/${sessionId}`).then(res => res.json()),
  },
  
  recommendations: {
    get: (message: string) => 
      apiRequest("POST", "/api/recommendations", { message }).then(res => res.json()),
  },
};
