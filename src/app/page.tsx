'use client';

import { useState } from 'react';
import { ArrowRight, Shield, Users, Star, TrendingUp, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  const [userType, setUserType] = useState<'client' | 'creator' | null>(null);

  const handleGetStarted = (type: 'client' | 'creator') => {
    setUserType(type);
    // In a real app, this would redirect to onboarding
    if (type === 'client') {
      window.location.href = '/client/discover';
    } else {
      window.location.href = '/creator/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-creator-background via-background to-creator-muted/30">
      {/* Header */}
      <header className="border-b border-creator-muted/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-creator-primary to-creator-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-creator-primary to-creator-secondary bg-clip-text text-transparent">
                Connect
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-creator-primary transition-colors">
                Features
              </a>
              <a href="#safety" className="text-sm font-medium text-muted-foreground hover:text-creator-primary transition-colors">
                Safety
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-creator-primary transition-colors">
                Pricing
              </a>
              <Button variant="outline" onClick={() => handleGetStarted('client')}>
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-creator-primary/10 to-creator-secondary/10 rounded-full border border-creator-primary/20">
              <Sparkles className="h-4 w-4 text-creator-primary" />
              <span className="text-sm font-medium text-creator-primary">Premium Creator Economy Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-creator-primary to-creator-secondary bg-clip-text text-transparent">
              Connect & Create
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              A sophisticated platform connecting verified creators with clients through personalized content, consultations, and premium experiences. Safe, elegant, and designed for success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Card className="p-6 w-full sm:w-80 border-creator-primary/20 hover:border-creator-primary/40 transition-all duration-300 cursor-pointer group" onClick={() => handleGetStarted('client')}>
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-creator-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-creator-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-creator-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">I'm a Client</h3>
                  <p className="text-sm text-muted-foreground mb-4">Discover amazing creators and book personalized experiences</p>
                  <Button className="w-full group-hover:bg-creator-primary/90">
                    Explore Creators
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 w-full sm:w-80 border-creator-secondary/20 hover:border-creator-secondary/40 transition-all duration-300 cursor-pointer group" onClick={() => handleGetStarted('creator')}>
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-creator-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-creator-secondary/20 transition-colors">
                    <Crown className="h-6 w-6 text-creator-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">I'm a Creator</h3>
                  <p className="text-sm text-muted-foreground mb-4">Monetize your skills and build meaningful client relationships</p>
                  <Button variant="outline" className="w-full border-creator-secondary text-creator-secondary hover:bg-creator-secondary hover:text-white">
                    Start Creating
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-muted-foreground">Verified Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.9</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{'<5min'}</div>
                <div className="text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-creator-muted/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A comprehensive platform designed for both creators and clients to thrive in the modern economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: 'Safe & Secure',
                  description: 'Identity verification, phone verification, and 24/7 content moderation ensure a safe environment.',
                  color: 'text-green-600'
                },
                {
                  icon: <Star className="h-6 w-6" />,
                  title: 'Premium Experience',
                  description: 'High-quality creators offering personalized services, consultations, and custom content.',
                  color: 'text-creator-secondary'
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: 'Multiple Revenue Streams',
                  description: 'Messaging, video calls, custom content, tips, and service bookings all in one platform.',
                  color: 'text-creator-primary'
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Real-time Messaging',
                  description: 'Seamless communication with media sharing, payment integration, and scheduling tools.',
                  color: 'text-blue-600'
                },
                {
                  icon: <Crown className="h-6 w-6" />,
                  title: 'Creator Dashboard',
                  description: 'Comprehensive analytics, earnings tracking, and business management tools for creators.',
                  color: 'text-purple-600'
                },
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: 'Smart Discovery',
                  description: 'Advanced search and filtering to help clients find the perfect creator for their needs.',
                  color: 'text-pink-600'
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-creator-muted/20">
                  <CardContent className="p-0">
                    <div className={`${feature.color} mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section id="safety" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full border border-green-500/20">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Trust & Safety First</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Built for Safety</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform prioritizes user safety with comprehensive verification and moderation systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  {
                    title: 'Identity Verification',
                    description: 'All creators undergo thorough identity verification before joining the platform.'
                  },
                  {
                    title: 'Phone Verification',
                    description: 'Only verified carrier numbers accepted (no VOIP) for enhanced security.'
                  },
                  {
                    title: '24/7 Content Moderation',
                    description: 'AI-powered and human moderation ensures all content meets our community standards.'
                  },
                  {
                    title: 'Report & Block System',
                    description: 'Easy-to-use tools for reporting inappropriate behavior and blocking users.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-br from-creator-primary/5 to-creator-secondary/5 border-creator-primary/20">
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 bg-creator-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-creator-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
                  <p className="text-muted-foreground mb-6">
                    Your data is protected with enterprise-grade security and encrypted communications.
                  </p>
                  <Badge className="bg-creator-primary">Trusted by 50K+ Users</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-creator-primary to-creator-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of creators and clients building meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => handleGetStarted('creator')}>
                Become a Creator
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-creator-primary" onClick={() => handleGetStarted('client')}>
                Find Creators
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-creator-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-creator-primary to-creator-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold bg-gradient-to-r from-creator-primary to-creator-secondary bg-clip-text text-transparent">
                Connect
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-creator-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-creator-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-creator-primary transition-colors">Support</a>
              <a href="#" className="hover:text-creator-primary transition-colors">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}