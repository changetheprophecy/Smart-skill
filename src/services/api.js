import { currentUser, swipeUsers, matchedUsers, conversations } from "../data/mockData";

// Mock API - returns static data without backend
export const api = {
  // Auth endpoints (mock)
  register: async (userData) => {
    return { success: true, user: currentUser, token: "mock_token" };
  },

  login: async (email, password) => {
    return { success: true, user: currentUser, token: "mock_token" };
  },

  getCurrentUser: async (token) => {
    return { success: true, user: currentUser };
  },

  updateProfile: async (token, profileData) => {
    return { success: true, user: { ...currentUser, ...profileData } };
  },

  // User endpoints (mock)
  getAllUsers: async (token) => {
    return { success: true, users: swipeUsers };
  },

  getUserById: async (token, userId) => {
    const user = swipeUsers.find(u => u.id === userId);
    return { success: true, user };
  },

  addMatch: async (token, userId) => {
    return { success: true, matched: true };
  },

  // Message endpoints (mock)
  getMessages: async (token, userId) => {
    return { success: true, messages: conversations[userId] || [] };
  },

  sendMessage: async (token, receiverId, text) => {
    return { success: true, message: { id: Date.now(), sender: "me", text, time: new Date().toLocaleTimeString() } };
  },
};
