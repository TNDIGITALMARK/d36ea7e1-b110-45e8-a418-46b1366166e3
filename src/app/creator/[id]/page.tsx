'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Star,
  MapPin,
  Clock,
  Verified,
  Heart,
  MessageCircle,
  Calendar,
  Play,
  Lock,
  Camera,
  Video,
  Globe,
  Award,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PlatformHeader } from '@/components/platform-header';
import { mockCreators, Creator } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/platform-utils';

export default function CreatorProfilePage() {
  const params = useParams();
  const creatorId = params.id as string;

  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const mockUser = {
    id: 'client1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    unreadMessages: 3,
    notifications: 2
  };

  const creator = useMemo(() => {
    return mockCreators.find(c => c.id === creatorId) || mockCreators[0];
  }, [creatorId]);

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
  };

  const handleSignOut = () => {
    console.log('Sign out');
  };

  const handleMessage = () => {
    console.log('Start conversation with:', creator.id);
  };

  const handleBookService = (serviceId: string) => {
    console.log('Book service:', serviceId);
    setSelectedService(serviceId);
  };

  const handleTip = () => {
    console.log('Send tip to:', creator.id);
  };

  const handleScheduleCall = () => {
    console.log('Schedule call with:', creator.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-creator-background via-background to-creator-muted/30">
      <PlatformHeader
        userType="client"
        user={mockUser}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
            <img
              src={creator.cover}
              alt={`${creator.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Creator Info Overlay */}
            <div className="absolute bottom-6 left-6 flex items-end gap-4">
              <Avatar className="h-24 w-24 ring-4 ring-white/30">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="bg-creator-primary text-white text-2xl">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-white">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{creator.name}</h1>
                  {creator.isVerified && (
                    <div className="bg-creator-secondary rounded-full p-1">
                      <Verified className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-white/80 mb-2">@{creator.username}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{creator.rating}</span>
                    <span>({creator.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{creator.location}</span>
                  </div>
                  {creator.isOnline && (
                    <Badge className="bg-green-500 hover:bg-green-500">
                      Online
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="text-white hover:text-creator-secondary hover:bg-black/20"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-creator-secondary text-creator-secondary' : ''}`} />
              </Button>
              <Button size="sm" onClick={handleMessage} className="bg-creator-primary hover:bg-creator-primary/90">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {creator.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {creator.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {creator.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Languages & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {creator.languages.map((language) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Response Time:</span>
                        <span className="text-sm font-medium">{creator.stats.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completion Rate:</span>
                        <span className="text-sm font-medium">{creator.stats.completionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Clients:</span>
                        <span className="text-sm font-medium">{creator.stats.totalClients}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {creator.services.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img
                            src={service.thumbnail}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                              {service.isPopular && (
                                <Badge className="bg-creator-secondary">Popular</Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-creator-primary">
                                {formatCurrency(service.price)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {service.duration}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Delivery: {service.deliveryTime}</span>
                            </div>
                            <Button onClick={() => handleBookService(service.id)}>
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creator.gallery.map((item) => (
                    <Card key={item.id} className="overflow-hidden group cursor-pointer">
                      <div className="relative aspect-video">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                          </div>
                        )}
                        {!item.isPreview && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                              <Lock className="h-3 w-3 text-white" />
                              <span className="text-xs text-white">{formatCurrency(item.price)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            {item.type === 'image' ? (
                              <Camera className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Video className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm text-muted-foreground capitalize">
                              {item.type}
                            </span>
                          </div>
                          {item.isPreview ? (
                            <Badge variant="outline">Preview</Badge>
                          ) : (
                            <span className="text-sm font-medium text-creator-primary">
                              {formatCurrency(item.price)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{creator.rating}</div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(creator.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {creator.totalReviews} reviews
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Mock Reviews */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={`https://images.unsplash.com/photo-150700${i}?w=40`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">User {i}</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              Amazing experience working with {creator.name}. Professional, responsive, and delivered exactly what was promised. Highly recommend!
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString())}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleMessage}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full" onClick={handleScheduleCall}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Send Tip
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send a Tip to {creator.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {[5, 10, 25].map((amount) => (
                          <Button key={amount} variant="outline" className="w-full">
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Add a personal message (optional)"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                      />
                      <Button className="w-full" onClick={handleTip}>
                        Send Tip
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages:</span>
                  <span className="text-sm font-medium">{formatCurrency(creator.pricing.messagingRate)}/msg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Video Calls:</span>
                  <span className="text-sm font-medium">{formatCurrency(creator.pricing.videoCallRate)}/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Custom Content:</span>
                  <span className="text-sm font-medium">from {formatCurrency(creator.pricing.customContentRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Min Tip:</span>
                  <span className="text-sm font-medium">{formatCurrency(creator.pricing.tipMinimum)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Verified className="h-4 w-4 text-green-500" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-creator-secondary" />
                  <span>Top Rated Creator</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-creator-primary" />
                  <span>{creator.stats.repeatClients}% Repeat Clients</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}