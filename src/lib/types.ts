export interface User {
  id: string;
  type: 'creator' | 'client';
  email: string;
  phone?: string;
  isPhoneVerified: boolean;
  createdAt: string;
  lastActive: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: 'message' | 'video_call' | 'custom_content' | 'tip' | 'service';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  description: string;
  platformFee: number;
}

export interface Booking {
  id: string;
  creatorId: string;
  clientId: string;
  serviceId: string;
  scheduledAt: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  duration: number; // minutes
  amount: number;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  creatorId: string;
  clientId: string;
  bookingId?: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Report {
  id: string;
  reportedUserId: string;
  reportedByUserId: string;
  reason: 'inappropriate_content' | 'harassment' | 'spam' | 'fraud' | 'other';
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface Block {
  id: string;
  blockedUserId: string;
  blockedByUserId: string;
  reason?: string;
  createdAt: string;
}

export interface SearchFilters {
  categories?: string[];
  languages?: string[];
  location?: string;
  ageRange?: [number, number];
  priceRange?: [number, number];
  isOnline?: boolean;
  isVerified?: boolean;
  rating?: number;
  sortBy?: 'popular' | 'newest' | 'price_low' | 'price_high' | 'rating';
}

export interface DashboardStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalClients: number;
  newClients: number;
  activeConversations: number;
  completedBookings: number;
  averageRating: number;
  totalReviews: number;
  responseTime: string;
  onlineTime: number; // hours
}

export interface NotificationSettings {
  newMessages: boolean;
  bookingReminders: boolean;
  paymentUpdates: boolean;
  promotionalEmails: boolean;
  weeklyReports: boolean;
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  showLocation: boolean;
  showAge: boolean;
  allowDirectMessages: boolean;
  requireVerification: boolean;
}

export interface CreatorSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  autoAcceptBookings: boolean;
  minimumBookingNotice: number; // hours
  maxConcurrentClients: number;
  workingHours: {
    [key: string]: { start: string; end: string; enabled: boolean };
  };
}

export type MessageType = 'text' | 'image' | 'video' | 'payment' | 'booking' | 'system';

export interface MediaFile {
  id: string;
  url: string;
  thumbnail?: string;
  type: 'image' | 'video' | 'audio';
  size: number;
  duration?: number; // for video/audio
  createdAt: string;
}