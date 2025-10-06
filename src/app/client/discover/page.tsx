'use client';

import { useState, useMemo } from 'react';
import { Grid, List, Sparkles, TrendingUp, Crown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreatorCard } from '@/components/creator-card';
import { SearchFiltersComponent } from '@/components/search-filters';
import { PlatformHeader } from '@/components/platform-header';
import { mockCreators, categories, Creator } from '@/lib/mock-data';
import { SearchFilters } from '@/lib/types';
import { filterCreators, sortCreators, searchCreators } from '@/lib/platform-utils';

export default function ClientDiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteCreators, setFavoriteCreators] = useState<string[]>(['1', '3']);

  // Mock user data
  const mockUser = {
    id: 'client1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    unreadMessages: 3,
    notifications: 2
  };

  // Filter and search creators
  const filteredCreators = useMemo(() => {
    let results = mockCreators;

    // Apply search
    if (searchQuery.trim()) {
      results = searchCreators(searchQuery, results);
    }

    // Apply filters
    results = filterCreators(results, filters);

    // Apply sorting
    results = sortCreators(results, filters.sortBy);

    return results;
  }, [searchQuery, filters]);

  // Category stats
  const categoryStats = useMemo(() => {
    return categories.map(category => {
      const count = mockCreators.filter(creator =>
        creator.categories.includes(category)
      ).length;
      return { category, count };
    }).sort((a, b) => b.count - a.count);
  }, []);

  // Featured creators (highest rated with most reviews)
  const featuredCreators = useMemo(() => {
    return [...mockCreators]
      .sort((a, b) => (b.rating * Math.log(b.totalReviews + 1)) - (a.rating * Math.log(a.totalReviews + 1)))
      .slice(0, 3);
  }, []);

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
  };

  const handleSignOut = () => {
    console.log('Sign out');
  };

  const handleMessage = (creatorId: string) => {
    console.log('Message creator:', creatorId);
    // Navigate to messages with creator
  };

  const handleViewProfile = (creatorId: string) => {
    console.log('View profile:', creatorId);
    // Navigate to creator profile
  };

  const handleFavorite = (creatorId: string) => {
    setFavoriteCreators(prev =>
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-creator-primary/10 to-creator-secondary/10 rounded-full border border-creator-primary/20">
            <Sparkles className="h-4 w-4 text-creator-primary" />
            <span className="text-sm font-medium text-creator-primary">Discover Amazing Creators</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-creator-primary to-creator-secondary bg-clip-text text-transparent">
            Connect & Create
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover talented creators offering personalized content, consultations, and experiences tailored just for you.
          </p>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <SearchFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultCount={filteredCreators.length}
            />

            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Creators Grid/List */}
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  variant={viewMode}
                  isFavorited={favoriteCreators.includes(creator.id)}
                  onMessage={() => handleMessage(creator.id)}
                  onViewProfile={() => handleViewProfile(creator.id)}
                  onFavorite={() => handleFavorite(creator.id)}
                />
              ))}
            </div>

            {filteredCreators.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-creator-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-creator-muted" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No creators found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find more creators.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-creator-secondary/10 to-creator-primary/10 rounded-full border border-creator-secondary/20">
                <Crown className="h-4 w-4 text-creator-secondary" />
                <span className="text-sm font-medium text-creator-secondary">Top Rated Creators</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Featured Creators</h2>
              <p className="text-muted-foreground">
                Our highest-rated creators with proven track records and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  isFavorited={favoriteCreators.includes(creator.id)}
                  onMessage={() => handleMessage(creator.id)}
                  onViewProfile={() => handleViewProfile(creator.id)}
                  onFavorite={() => handleFavorite(creator.id)}
                />
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockCreators.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Verified professionals
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(mockCreators.reduce((sum, c) => sum + c.rating, 0) / mockCreators.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Platform average
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Crown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{'< 10m'}</div>
                  <p className="text-xs text-muted-foreground">
                    Average response
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">
                Explore creators by their specialties and interests.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryStats.map(({ category, count }) => (
                <Card
                  key={category}
                  className="cursor-pointer hover:shadow-lg hover:shadow-creator-primary/10 transition-all duration-300 border-creator-muted/20 hover:border-creator-primary/30"
                  onClick={() => setFilters({ ...filters, categories: [category] })}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-creator-primary/10 to-creator-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-semibold text-creator-primary">
                        {category.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {count} creator{count !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}