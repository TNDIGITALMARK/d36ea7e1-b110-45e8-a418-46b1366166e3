import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Creator, SearchFilters, Transaction, DashboardStats } from './types';
import { mockCreators, mockMessages, mockConversations } from './mock-data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(date);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function filterCreators(creators: Creator[], filters: SearchFilters): Creator[] {
  return creators.filter(creator => {
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.some(cat => creator.categories.includes(cat))) {
        return false;
      }
    }

    // Language filter
    if (filters.languages && filters.languages.length > 0) {
      if (!filters.languages.some(lang => creator.languages.includes(lang))) {
        return false;
      }
    }

    // Age range filter
    if (filters.ageRange) {
      if (creator.age < filters.ageRange[0] || creator.age > filters.ageRange[1]) {
        return false;
      }
    }

    // Price range filter (based on minimum service price)
    if (filters.priceRange && creator.services.length > 0) {
      const minPrice = Math.min(...creator.services.map(s => s.price));
      if (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1]) {
        return false;
      }
    }

    // Online status filter
    if (filters.isOnline !== undefined) {
      if (creator.isOnline !== filters.isOnline) {
        return false;
      }
    }

    // Verified filter
    if (filters.isVerified !== undefined) {
      if (creator.isVerified !== filters.isVerified) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating) {
      if (creator.rating < filters.rating) {
        return false;
      }
    }

    return true;
  });
}

export function sortCreators(creators: Creator[], sortBy: SearchFilters['sortBy'] = 'popular'): Creator[] {
  return [...creators].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        // Mock: assume newer creators have higher IDs
        return parseInt(b.id) - parseInt(a.id);
      case 'price_low':
        const aMinPrice = a.services.length > 0 ? Math.min(...a.services.map(s => s.price)) : 0;
        const bMinPrice = b.services.length > 0 ? Math.min(...b.services.map(s => s.price)) : 0;
        return aMinPrice - bMinPrice;
      case 'price_high':
        const aMaxPrice = a.services.length > 0 ? Math.max(...a.services.map(s => s.price)) : 0;
        const bMaxPrice = b.services.length > 0 ? Math.max(...b.services.map(s => s.price)) : 0;
        return bMaxPrice - aMaxPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        // Sort by combination of rating and review count
        const aPopularity = a.rating * Math.log(a.totalReviews + 1);
        const bPopularity = b.rating * Math.log(b.totalReviews + 1);
        return bPopularity - aPopularity;
    }
  });
}

export function searchCreators(query: string, creators: Creator[]): Creator[] {
  if (!query.trim()) return creators;

  const searchTerm = query.toLowerCase();

  return creators.filter(creator => {
    return (
      creator.name.toLowerCase().includes(searchTerm) ||
      creator.username.toLowerCase().includes(searchTerm) ||
      creator.bio.toLowerCase().includes(searchTerm) ||
      creator.location.toLowerCase().includes(searchTerm) ||
      creator.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      creator.languages.some(lang => lang.toLowerCase().includes(searchTerm)) ||
      creator.services.some(service =>
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
      )
    );
  });
}

export function calculatePlatformFee(amount: number, feePercentage: number = 20): number {
  return Math.round(amount * (feePercentage / 100) * 100) / 100;
}

export function calculateCreatorEarnings(amount: number, feePercentage: number = 20): number {
  return amount - calculatePlatformFee(amount, feePercentage);
}

export function generateDashboardStats(creatorId: string): DashboardStats {
  const creator = mockCreators.find(c => c.id === creatorId);
  if (!creator) {
    return {
      totalEarnings: 0,
      monthlyEarnings: 0,
      totalClients: 0,
      newClients: 0,
      activeConversations: 0,
      completedBookings: 0,
      averageRating: 0,
      totalReviews: 0,
      responseTime: 'N/A',
      onlineTime: 0,
    };
  }

  const conversations = mockConversations.filter(c => c.creatorId === creatorId);
  const activeConversations = conversations.filter(c => c.isActive).length;

  return {
    totalEarnings: creator.stats.totalEarnings,
    monthlyEarnings: Math.round(creator.stats.totalEarnings * 0.3), // Mock: 30% of total
    totalClients: creator.stats.totalClients,
    newClients: Math.round(creator.stats.totalClients * 0.1), // Mock: 10% new
    activeConversations,
    completedBookings: Math.round(creator.stats.totalClients * 0.8), // Mock: 80% completion rate
    averageRating: creator.rating,
    totalReviews: creator.totalReviews,
    responseTime: creator.stats.responseTime,
    onlineTime: 6.5, // Mock: 6.5 hours average
  };
}

export function isValidCarrier(phoneNumber: string): boolean {
  // Mock phone validation - in real app this would check against carrier database
  const validCarriers = ['verizon', 'att', 'metro', 'boost', 'tmobile', 'sprint'];
  // This is a simplified mock - real implementation would use phone validation service
  return phoneNumber.length >= 10;
}

export function getTimeUntilNextSlot(availability: Creator['availability']): string {
  const now = new Date();
  const currentDay = now.toLocaleLowerCase().substr(0, 3); // 'mon', 'tue', etc.
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Mock calculation - in real app would properly parse availability
  return 'Available now';
}

export function maskPhoneNumber(phone: string): string {
  if (phone.length < 4) return phone;
  return phone.slice(0, -4).replace(/\d/g, '*') + phone.slice(-4);
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;
  const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username.slice(-1);
  return maskedUsername + '@' + domain;
}

export function generateUploadUrl(fileType: string): string {
  // Mock function - in real app would generate presigned URL
  return `https://api.platform.com/upload/${generateId()}?type=${fileType}`;
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  return imageExtensions.includes(getFileExtension(filename));
}

export function isVideoFile(filename: string): boolean {
  const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
  return videoExtensions.includes(getFileExtension(filename));
}