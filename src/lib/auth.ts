// Temporary mock authentication system
// This will be replaced with a proper authentication system later

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  displayName?: string;
  username?: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'dev.shoreagents@gmail.com',
    role: 'admin',
    displayName: 'Dev Admin',
    username: 'devadmin'
  }
];

// Mock authentication state
let currentUser: User | null = null;

export const auth = {
  // Sign in
  signIn: async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
    try {
      // Mock authentication - in a real system, this would verify credentials
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        currentUser = user;
        return { user, error: null };
      }
      return { user: null, error: new Error('Invalid credentials') };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign up
  signUp: async (email: string, password: string, metadata?: { displayName?: string; username?: string }): Promise<{ user: User | null; error: Error | null }> => {
    try {
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        return { user: null, error: new Error('User already exists') };
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: 'user',
        ...metadata
      };

      mockUsers.push(newUser);
      currentUser = newUser;
      return { user: newUser, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign out
  signOut: async (): Promise<{ error: Error | null }> => {
    try {
      currentUser = null;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return currentUser;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return currentUser !== null;
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    return currentUser?.role === 'admin';
  },

  // Update user profile
  updateProfile: async (updates: Partial<User>): Promise<{ user: User | null; error: Error | null }> => {
    try {
      if (!currentUser) {
        return { user: null, error: new Error('No user found') };
      }

      const userIndex = mockUsers.findIndex(u => u.id === currentUser!.id);
      if (userIndex === -1) {
        return { user: null, error: new Error('User not found') };
      }

      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
      currentUser = mockUsers[userIndex];
      return { user: currentUser, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }
}; 