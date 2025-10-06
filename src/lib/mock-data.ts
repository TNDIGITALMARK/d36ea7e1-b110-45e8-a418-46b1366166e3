export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  age: number;
  isVerified: boolean;
  isOnline: boolean;
  rating: number;
  totalReviews: number;
  languages: string[];
  categories: string[];
  stats: {
    totalEarnings: number;
    totalClients: number;
    responseTime: string;
    completionRate: number;
    repeatClients: number;
  };
  services: CreatorService[];
  availability: {
    [key: string]: { start: string; end: string; available: boolean }[];
  };
  gallery: {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail: string;
    title: string;
    price: number;
    isPreview: boolean;
  }[];
  pricing: {
    messagingRate: number; // per message
    videoCallRate: number; // per minute
    customContentRate: number; // base rate
    tipMinimum: number;
  };
}

export interface CreatorService {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  deliveryTime: string;
  features: string[];
  isPopular: boolean;
  thumbnail: string;
}

export interface Client {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  joinedDate: string;
  totalSpent: number;
  favoriteCreators: string[];
  preferences: {
    categories: string[];
    languages: string[];
    ageRange: [number, number];
  };
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'payment';
  timestamp: string;
  isRead: boolean;
  mediaUrl?: string;
  paymentAmount?: number;
}

export interface Conversation {
  id: string;
  creatorId: string;
  clientId: string;
  lastMessage: string;
  lastMessageTime: string;
  isActive: boolean;
  unreadCount: number;
  totalSpent: number;
}

export const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Isabella Rose',
    username: 'bella_rose',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    bio: 'Professional model and lifestyle content creator. Specializing in elegant photography and personalized experiences. Available for custom content and video calls.',
    location: 'Los Angeles, CA',
    age: 26,
    isVerified: true,
    isOnline: true,
    rating: 4.9,
    totalReviews: 342,
    languages: ['English', 'Spanish'],
    categories: ['Photography', 'Lifestyle', 'Fashion'],
    stats: {
      totalEarnings: 45800,
      totalClients: 156,
      responseTime: '< 5 min',
      completionRate: 98,
      repeatClients: 78
    },
    services: [
      {
        id: 's1',
        title: 'Custom Photo Set',
        description: 'Personalized photo collection tailored to your preferences',
        category: 'Photography',
        price: 150,
        duration: '5-10 photos',
        deliveryTime: '24-48 hours',
        features: ['High resolution', 'Multiple outfits', 'Custom poses'],
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=300'
      },
      {
        id: 's2',
        title: 'Video Call Session',
        description: 'Private one-on-one video conversation',
        category: 'Video Call',
        price: 80,
        duration: '30 minutes',
        deliveryTime: 'Scheduled',
        features: ['HD video', 'Private session', 'Recording available'],
        isPopular: false,
        thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300'
      }
    ],
    availability: {
      monday: [{ start: '09:00', end: '17:00', available: true }],
      tuesday: [{ start: '09:00', end: '17:00', available: true }],
      wednesday: [{ start: '09:00', end: '17:00', available: true }],
      thursday: [{ start: '09:00', end: '17:00', available: true }],
      friday: [{ start: '09:00', end: '15:00', available: true }],
      saturday: [{ start: '11:00', end: '16:00', available: true }],
      sunday: [{ start: '12:00', end: '16:00', available: false }]
    },
    gallery: [
      {
        id: 'g1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600',
        thumbnail: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=300',
        title: 'Elegant Portrait',
        price: 25,
        isPreview: true
      },
      {
        id: 'g2',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300',
        title: 'Behind the Scenes',
        price: 45,
        isPreview: false
      }
    ],
    pricing: {
      messagingRate: 5,
      videoCallRate: 4,
      customContentRate: 100,
      tipMinimum: 10
    }
  },
  {
    id: '2',
    name: 'Sophia Chen',
    username: 'sophia_creates',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    cover: 'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=800',
    bio: 'Artist and creative professional offering unique artistic content and interactive sessions. Focused on creativity and authentic connections.',
    location: 'New York, NY',
    age: 24,
    isVerified: true,
    isOnline: false,
    rating: 4.8,
    totalReviews: 198,
    languages: ['English', 'Mandarin'],
    categories: ['Art', 'Creative', 'Lifestyle'],
    stats: {
      totalEarnings: 32400,
      totalClients: 89,
      responseTime: '< 10 min',
      completionRate: 96,
      repeatClients: 54
    },
    services: [
      {
        id: 's3',
        title: 'Custom Artwork',
        description: 'Personalized digital or traditional artwork',
        category: 'Art',
        price: 200,
        duration: 'Digital file',
        deliveryTime: '3-5 days',
        features: ['Original artwork', 'High resolution', 'Multiple formats'],
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300'
      }
    ],
    availability: {
      monday: [{ start: '10:00', end: '18:00', available: true }],
      tuesday: [{ start: '10:00', end: '18:00', available: true }],
      wednesday: [{ start: '10:00', end: '18:00', available: false }],
      thursday: [{ start: '10:00', end: '18:00', available: true }],
      friday: [{ start: '10:00', end: '16:00', available: true }],
      saturday: [{ start: '12:00', end: '17:00', available: true }],
      sunday: [{ start: '14:00', end: '17:00', available: true }]
    },
    gallery: [
      {
        id: 'g3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
        thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300',
        title: 'Abstract Art',
        price: 30,
        isPreview: true
      }
    ],
    pricing: {
      messagingRate: 4,
      videoCallRate: 5,
      customContentRate: 150,
      tipMinimum: 15
    }
  },
  {
    id: '3',
    name: 'Mia Rodriguez',
    username: 'mia_lifestyle',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    cover: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800',
    bio: 'Lifestyle influencer and wellness coach. Offering personalized wellness content and motivational sessions.',
    location: 'Miami, FL',
    age: 28,
    isVerified: true,
    isOnline: true,
    rating: 4.7,
    totalReviews: 267,
    languages: ['English', 'Spanish'],
    categories: ['Wellness', 'Fitness', 'Lifestyle'],
    stats: {
      totalEarnings: 38900,
      totalClients: 123,
      responseTime: '< 15 min',
      completionRate: 94,
      repeatClients: 87
    },
    services: [
      {
        id: 's4',
        title: 'Wellness Consultation',
        description: 'Personal wellness and lifestyle guidance',
        category: 'Wellness',
        price: 120,
        duration: '45 minutes',
        deliveryTime: 'Scheduled',
        features: ['Personalized plan', 'Follow-up support', 'Resource materials'],
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300'
      }
    ],
    availability: {
      monday: [{ start: '08:00', end: '16:00', available: true }],
      tuesday: [{ start: '08:00', end: '16:00', available: true }],
      wednesday: [{ start: '08:00', end: '16:00', available: true }],
      thursday: [{ start: '08:00', end: '16:00', available: true }],
      friday: [{ start: '08:00', end: '14:00', available: true }],
      saturday: [{ start: '10:00', end: '15:00', available: false }],
      sunday: [{ start: '10:00', end: '15:00', available: false }]
    },
    gallery: [
      {
        id: 'g4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        title: 'Wellness Session',
        price: 20,
        isPreview: true
      }
    ],
    pricing: {
      messagingRate: 3,
      videoCallRate: 6,
      customContentRate: 80,
      tipMinimum: 5
    }
  }
];

export const mockServices: CreatorService[] = [
  ...mockCreators.flatMap(creator => creator.services)
];

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'John Smith',
    username: 'john_s',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    isVerified: true,
    joinedDate: '2024-01-15',
    totalSpent: 1250,
    favoriteCreators: ['1', '3'],
    preferences: {
      categories: ['Photography', 'Lifestyle'],
      languages: ['English'],
      ageRange: [24, 30]
    }
  },
  {
    id: 'c2',
    name: 'Michael Johnson',
    username: 'mike_j',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true,
    joinedDate: '2024-02-08',
    totalSpent: 890,
    favoriteCreators: ['2'],
    preferences: {
      categories: ['Art', 'Creative'],
      languages: ['English'],
      ageRange: [22, 28]
    }
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    creatorId: '1',
    clientId: 'c1',
    lastMessage: 'Thank you for the amazing photos! Looking forward to our next session.',
    lastMessageTime: '2024-10-06T14:30:00Z',
    isActive: true,
    unreadCount: 0,
    totalSpent: 350
  },
  {
    id: 'conv2',
    creatorId: '2',
    clientId: 'c2',
    lastMessage: 'I love the artwork concept! When can we schedule the video call?',
    lastMessageTime: '2024-10-06T12:15:00Z',
    isActive: true,
    unreadCount: 2,
    totalSpent: 200
  },
  {
    id: 'conv3',
    creatorId: '3',
    clientId: 'c1',
    lastMessage: 'The wellness plan you created is exactly what I needed!',
    lastMessageTime: '2024-10-06T09:45:00Z',
    isActive: false,
    unreadCount: 1,
    totalSpent: 120
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: 'conv1',
    senderId: 'c1',
    content: 'Hi Isabella! I would love to book a custom photo set.',
    type: 'text',
    timestamp: '2024-10-06T13:00:00Z',
    isRead: true
  },
  {
    id: 'm2',
    conversationId: 'conv1',
    senderId: '1',
    content: 'Hello! I would be happy to create a custom set for you. What style are you looking for?',
    type: 'text',
    timestamp: '2024-10-06T13:05:00Z',
    isRead: true
  },
  {
    id: 'm3',
    conversationId: 'conv1',
    senderId: 'c1',
    content: 'Something elegant and professional, similar to your portfolio work.',
    type: 'text',
    timestamp: '2024-10-06T13:10:00Z',
    isRead: true
  },
  {
    id: 'm4',
    conversationId: 'conv1',
    senderId: '1',
    content: 'Perfect! I can create a beautiful elegant set for you. The package includes 8-10 high-resolution photos.',
    type: 'text',
    timestamp: '2024-10-06T13:15:00Z',
    isRead: true
  },
  {
    id: 'm5',
    conversationId: 'conv1',
    senderId: 'c1',
    content: 'That sounds perfect! How do we proceed with payment?',
    type: 'text',
    timestamp: '2024-10-06T13:20:00Z',
    isRead: true
  }
];

export const categories = [
  'Photography',
  'Lifestyle',
  'Fashion',
  'Art',
  'Creative',
  'Wellness',
  'Fitness',
  'Beauty',
  'Travel',
  'Cooking'
];

export const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Mandarin',
  'Japanese',
  'Korean'
];

export const serviceTypes = [
  'Custom Photos',
  'Video Calls',
  'Artwork',
  'Consultations',
  'Coaching',
  'Tutorials',
  'Personalized Content'
];