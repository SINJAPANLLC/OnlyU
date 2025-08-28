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
  role: 'manager' | 'creator' | 'fan';
  status: 'active' | 'banned';
  createdAt: string;
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
  status: 'public' | 'private' | 'removed';
  type: 'image' | 'video' | 'text';
  contentUrl?: string;
  views?: number;
  earnings?: number;
  tags?: string[];
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

export interface Report {
  id: string;
  postId: string;
  reporterId: string;
  reporter: User;
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
  post: Post;
}

export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalReports: number;
  bannedUsers: number;
  removedPosts: number;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isManager: boolean;
}

export interface CreatorStats {
  totalPosts: number;
  totalFollowers: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalEarnings: number;
  monthlyGrowth: number;
  topPosts: Post[];
  recentActivity: CreatorActivity[];
}

export interface CreatorActivity {
  id: string;
  type: 'new_follower' | 'new_like' | 'new_comment' | 'new_earnings' | 'post_published';
  content: string;
  timestamp: string;
  relatedId?: string;
  relatedData?: any;
}

export interface CreatorPost {
  id: string;
  title?: string;
  content: string;
  images?: string[];
  videoUrl?: string;
  type: 'image' | 'video' | 'text' | 'premium';
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  visibility: 'public' | 'private' | 'subscribers_only';
  publishDate: string;
  scheduledDate?: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorAnalytics {
  period: '7d' | '30d' | '90d' | '1y';
  followers: { date: string; count: number }[];
  views: { date: string; count: number }[];
  likes: { date: string; count: number }[];
  earnings: { date: string; amount: number }[];
  topContent: { postId: string; title: string; views: number; earnings: number }[];
}

export interface FanInteraction {
  id: string;
  fanId: string;
  fan: User;
  type: 'follow' | 'like' | 'comment' | 'tip' | 'subscription';
  postId?: string;
  post?: Post;
  amount?: number;
  message?: string;
  timestamp: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  benefits: string[];
  isActive: boolean;
  subscriberCount: number;
  createdAt: string;
}

export interface CreatorSettings {
  id: string;
  creatorId: string;
  autoApproveComments: boolean;
  allowAnonymousComments: boolean;
  minimumCommentLength: number;
  profanityFilter: boolean;
  autoArchiveOldPosts: boolean;
  archiveAfterDays: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  defaultPostVisibility: 'public' | 'private' | 'subscribers_only';
  allowFanMessages: boolean;
  autoReplyToMessages: boolean;
  customAutoReply?: string;
}