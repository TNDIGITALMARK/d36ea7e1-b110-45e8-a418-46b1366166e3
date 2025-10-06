'use client';

import { useState } from 'react';
import {
  DollarSign,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  Eye,
  Heart,
  BarChart3,
  Activity,
  FileText,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PlatformHeader } from '@/components/platform-header';
import { mockCreators, mockConversations, Creator } from '@/lib/mock-data';
import { generateDashboardStats, formatCurrency, formatTimeAgo } from '@/lib/platform-utils';

export default function CreatorDashboardPage() {
  // Mock logged-in creator (first creator from mock data)
  const currentCreator: Creator = mockCreators[0];

  // Mock user data for header
  const mockUser = {
    id: currentCreator.id,
    name: currentCreator.name,
    avatar: currentCreator.avatar,
    unreadMessages: 5,
    notifications: 3
  };

  const stats = generateDashboardStats(currentCreator.id);
  const conversations = mockConversations.filter(c => c.creatorId === currentCreator.id);

  const [activeTab, setActiveTab] = useState('overview');

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
  };

  const handleSignOut = () => {
    console.log('Sign out');
  };

  // Mock weekly earnings data
  const weeklyEarnings = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 150 },
    { day: 'Wed', amount: 200 },
    { day: 'Thu', amount: 180 },
    { day: 'Fri', amount: 250 },
    { day: 'Sat', amount: 300 },
    { day: 'Sun', amount: 220 }
  ];

  const maxEarning = Math.max(...weeklyEarnings.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gradient-to-br from-creator-background via-background to-creator-muted/30">
      <PlatformHeader
        userType="creator"
        user={mockUser}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentCreator.name}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your creator account today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+{stats.newClients} new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeConversations}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Avg response: {stats.responseTime}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{stats.totalReviews} reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-creator-muted/20">
                      <div className="w-8 h-8 bg-creator-primary/10 rounded-full flex items-center justify-center">
                        {i % 2 === 0 ? (
                          <MessageCircle className="h-4 w-4 text-creator-primary" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-creator-secondary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {i % 2 === 0 ? 'New message from client' : 'Payment received'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString())}
                        </p>
                      </div>
                      {i % 2 !== 0 && (
                        <span className="text-sm font-medium text-creator-secondary">
                          +{formatCurrency(50 * i)}
                        </span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly Goal</span>
                        <span>{formatCurrency(stats.monthlyEarnings)}/{formatCurrency(15000)}</span>
                      </div>
                      <Progress value={(stats.monthlyEarnings / 15000) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>New Clients</span>
                        <span>{stats.newClients}/20</span>
                      </div>
                      <Progress value={(stats.newClients / 20) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Time</span>
                        <span className="text-green-600">Excellent</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Online Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stats.onlineTime}h</div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <div className="mt-3">
                      <Badge className={currentCreator.isOnline ? 'bg-green-500' : 'bg-gray-500'}>
                        {currentCreator.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklyEarnings.map((day) => (
                      <div key={day.day} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-10">{day.day}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div
                              className="h-8 bg-gradient-to-r from-creator-primary to-creator-secondary rounded"
                              style={{ width: `${(day.amount / maxEarning) * 100}%` }}
                            />
                            <span className="text-sm font-medium ml-2">
                              {formatCurrency(day.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Messages:</span>
                      <span className="text-sm font-medium">{formatCurrency(2400)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Video Calls:</span>
                      <span className="text-sm font-medium">{formatCurrency(1800)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Custom Content:</span>
                      <span className="text-sm font-medium">{formatCurrency(3200)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tips:</span>
                      <span className="text-sm font-medium">{formatCurrency(800)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatCurrency(8200)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payout Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available:</span>
                      <span className="text-sm font-medium text-green-600">
                        {formatCurrency(stats.monthlyEarnings * 0.8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pending:</span>
                      <span className="text-sm font-medium">{formatCurrency(stats.monthlyEarnings * 0.2)}</span>
                    </div>
                    <Button className="w-full mt-3">Request Payout</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Active Conversations
                  </span>
                  <Badge>{stats.activeConversations} active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => {
                    const client = { name: 'Client User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40' }; // Mock client
                    return (
                      <div key={conversation.id} className="flex items-center gap-3 p-3 rounded-lg border border-creator-muted/20 hover:bg-creator-muted/5 cursor-pointer transition-colors">
                        <Avatar>
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium">{client.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-creator-primary">{conversation.unreadCount}</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Services</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid gap-6">
              {currentCreator.services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{service.title}</h4>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Stats</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <div className="font-medium">{formatCurrency(service.price)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{service.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Orders:</span>
                        <div className="font-medium">12 this month</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Earnings:</span>
                        <div className="font-medium text-creator-primary">{formatCurrency(service.price * 12)}</div>
                      </div>
                    </div>

                    {service.isPopular && (
                      <Badge className="mt-3 bg-creator-secondary">Popular</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Profile Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">1,247</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+15% this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">89</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+3 this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">12.5%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+2.1% this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-creator-primary/5 rounded-lg border border-creator-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-creator-primary" />
                    <span className="font-medium">Great Performance!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your response time is 20% faster than average. Keep up the excellent work!
                  </p>
                </div>

                <div className="p-4 bg-creator-secondary/5 rounded-lg border border-creator-secondary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-creator-secondary" />
                    <span className="font-medium">Tip: Optimize Your Profile</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adding more gallery items could increase your profile views by up to 25%.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}