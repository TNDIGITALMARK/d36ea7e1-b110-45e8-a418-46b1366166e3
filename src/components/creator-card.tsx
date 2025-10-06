'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Star, MapPin, Clock, Verified, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Creator } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/platform-utils';

interface CreatorCardProps {
  creator: Creator;
  onMessage?: () => void;
  onViewProfile?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
  variant?: 'grid' | 'list';
}

export function CreatorCard({
  creator,
  onMessage,
  onViewProfile,
  onFavorite,
  isFavorited = false,
  variant = 'grid'
}: CreatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const minPrice = creator.services.length > 0 ? Math.min(...creator.services.map(s => s.price)) : 0;

  if (variant === 'list') {
    return (
      <Card className="overflow-hidden border-creator-muted/20 hover:border-creator-primary/30 transition-all duration-300 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-shrink-0">
              <Avatar className="h-16 w-16 ring-2 ring-creator-primary/20">
                <AvatarImage
                  src={creator.avatar}
                  alt={creator.name}
                  onLoad={() => setImageLoaded(true)}
                />
                <AvatarFallback className="bg-creator-primary/10 text-creator-primary">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {creator.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-background" />
              )}
              {creator.isVerified && (
                <div className="absolute -top-1 -right-1 bg-creator-secondary rounded-full p-1">
                  <Verified className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground truncate">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground">@{creator.username}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFavorite}
                  className="text-creator-secondary hover:text-creator-secondary/80"
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{creator.rating}</span>
                  <span>({creator.totalReviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{creator.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Responds {creator.stats.responseTime}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {creator.bio}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {creator.categories.slice(0, 2).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                  {creator.categories.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{creator.categories.length - 2} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-creator-primary">
                    {minPrice > 0 ? `from ${formatCurrency(minPrice)}` : 'Contact'}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onViewProfile}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={onMessage} className="bg-creator-primary hover:bg-creator-primary/90">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-creator-muted/20 hover:border-creator-primary/30 hover:shadow-lg hover:shadow-creator-primary/10 transition-all duration-300 bg-card/80 backdrop-blur-sm group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewProfile}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={creator.cover}
          alt={`${creator.name} cover`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-creator-muted animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {creator.isOnline && (
            <Badge className="bg-green-500 hover:bg-green-500 text-white border-0">
              Online
            </Badge>
          )}
          {creator.isVerified && (
            <Badge className="bg-creator-secondary hover:bg-creator-secondary text-white border-0 flex items-center gap-1">
              <Verified className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.();
            }}
            className="text-white hover:text-creator-secondary hover:bg-black/20"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-creator-secondary text-creator-secondary' : ''}`} />
          </Button>
        </div>

        {/* Creator avatar */}
        <div className="absolute bottom-3 left-3">
          <Avatar className="h-12 w-12 ring-2 ring-white/30">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback className="bg-creator-primary text-white">
              {creator.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-medium">{creator.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg text-foreground truncate">{creator.name}</h3>
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{creator.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{creator.age} years</span>
          </div>
          <div className="flex items-center gap-1">
            <span>({creator.totalReviews} reviews)</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {creator.bio}
        </p>

        <div className="flex gap-1 flex-wrap mb-3">
          {creator.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-creator-primary">
            {minPrice > 0 ? `from ${formatCurrency(minPrice)}` : 'Contact'}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMessage?.();
            }}
            className="bg-creator-primary hover:bg-creator-primary/90"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}