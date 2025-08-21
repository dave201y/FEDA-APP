// src/entities/User.ts

export interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed for your app (e.g., profile picture, preferences link)
}

// --- Mock Data (Replace with Appwrite SDK calls later) ---
const mockCurrentUser: User = {
  id: "user_id_abc", // In a real app, this would come from authentication
  email: "user@example.com",
  name: "Mindful Viewer"
};

export const User = {
  /**
   * Mocks fetching the currently logged-in user. In a real app, this would use Appwrite Auth.
   * @returns Promise<User>
   */
  me: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
    return mockCurrentUser;
  },

  /**
   * Mocks updating user information.
   * @param data (Partial<User>) - Partial user object with fields to update.
   * @returns Promise<void>
   */
  update: async (data: Partial<User>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    Object.assign(mockCurrentUser, data);
    console.log("Mock User updated:", mockCurrentUser);
  }
};
