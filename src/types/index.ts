export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isVerified: boolean;
  joinedDate: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPremium?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  fromUser: User;
  content: string;
  timestamp: string;
  isRead: boolean;
  postId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}