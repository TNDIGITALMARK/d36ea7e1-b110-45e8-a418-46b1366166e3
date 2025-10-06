'use client';

import { useState } from 'react';
import { Bell, MessageCircle, User, Settings, LogOut, Menu, X, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface PlatformHeaderProps {
  userType: 'client' | 'creator';
  user: {
    id: string;
    name: string;
    avatar: string;
    unreadMessages?: number;
    notifications?: number;
  };
  onNavigate: (path: string) => void;
  onSignOut: () => void;
}

export function PlatformHeader({ userType, user, onNavigate, onSignOut }: PlatformHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = userType === 'creator' ? [
    { label: 'Dashboard', path: '/creator/dashboard' },
    { label: 'Messages', path: '/creator/messages' },
    { label: 'Earnings', path: '/creator/earnings' },
    { label: 'Schedule', path: '/creator/schedule' },
    { label: 'Profile', path: '/creator/profile' }
  ] : [
    { label: 'Discover', path: '/client/discover' },
    { label: 'Messages', path: '/client/messages' },
    { label: 'Favorites', path: '/client/favorites' },
    { label: 'Bookings', path: '/client/bookings' }
  ];

  return (
    <header className="border-b border-creator-muted/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate(userType === 'creator' ? '/creator/dashboard' : '/client/discover')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-creator-primary to-creator-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-creator-primary to-creator-secondary bg-clip-text text-transparent">
                Connect
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className="text-sm font-medium text-muted-foreground hover:text-creator-primary transition-colors relative group"
                >
                  {item.label}
                  {item.label === 'Messages' && user.unreadMessages && user.unreadMessages > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-creator-secondary">
                      {user.unreadMessages > 9 ? '9+' : user.unreadMessages}
                    </Badge>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-creator-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search (mobile) */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-muted-foreground hover:text-creator-primary"
              onClick={() => onNavigate('/search')}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-muted-foreground hover:text-creator-primary"
              onClick={() => onNavigate(userType === 'creator' ? '/creator/messages' : '/client/messages')}
            >
              <MessageCircle className="h-5 w-5" />
              {user.unreadMessages && user.unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-creator-secondary">
                  {user.unreadMessages > 9 ? '9+' : user.unreadMessages}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-muted-foreground hover:text-creator-primary"
              onClick={() => onNavigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              {user.notifications && user.notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-creator-primary">
                  {user.notifications > 9 ? '9+' : user.notifications}
                </Badge>
              )}
            </Button>

            {/* Favorites (client only) */}
            {userType === 'client' && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-creator-secondary"
                onClick={() => onNavigate('/client/favorites')}
              >
                <Heart className="h-5 w-5" />
              </Button>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 ring-2 ring-creator-primary/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-creator-primary/10 text-creator-primary">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {userType === 'creator' ? 'Creator Account' : 'Client Account'}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate(userType === 'creator' ? '/creator/profile' : '/client/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-creator-primary to-creator-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    Connect
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        onNavigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-creator-muted/20 text-left transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.label === 'Messages' && user.unreadMessages && user.unreadMessages > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 text-xs bg-creator-secondary">
                          {user.unreadMessages > 9 ? '9+' : user.unreadMessages}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}