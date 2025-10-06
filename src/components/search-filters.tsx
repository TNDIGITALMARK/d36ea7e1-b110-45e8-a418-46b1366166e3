'use client';

import { useState } from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/lib/types';
import { categories, languages } from '@/lib/mock-data';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
}

export function SearchFiltersComponent({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  resultCount
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const activeFiltersCount = [
    filters.categories?.length || 0,
    filters.languages?.length || 0,
    filters.ageRange ? 1 : 0,
    filters.priceRange ? 1 : 0,
    filters.isOnline ? 1 : 0,
    filters.isVerified ? 1 : 0,
    filters.rating ? 1 : 0
  ].reduce((sum, count) => sum + (count > 0 ? 1 : 0), 0);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleCategory = (category: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    updateFilter('categories', newCategories.length > 0 ? newCategories : undefined);
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = filters.languages || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];

    updateFilter('languages', newLanguages.length > 0 ? newLanguages : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const clearFilter = (key: keyof SearchFilters) => {
    updateFilter(key, undefined);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search creators by name, category, location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 h-12 text-base border-creator-muted/20 focus:border-creator-primary/50 focus:ring-creator-primary/20"
        />
      </div>

      {/* Quick Actions Row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs bg-creator-primary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear all
                  </Button>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={filters.sortBy} onValueChange={(value: any) => updateFilter('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Most Popular" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={filters.categories?.includes(category) || false}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={category} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.slice(0, 6).map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={filters.languages?.includes(language) || false}
                          onCheckedChange={() => toggleLanguage(language)}
                        />
                        <Label htmlFor={language} className="text-sm">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age Range */}
                <div className="space-y-2">
                  <Label>Age Range: {filters.ageRange ? `${filters.ageRange[0]} - ${filters.ageRange[1]}` : '18 - 40'}</Label>
                  <Slider
                    value={filters.ageRange || [18, 40]}
                    onValueChange={(value) => updateFilter('ageRange', value as [number, number])}
                    min={18}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range: {filters.priceRange ? `$${filters.priceRange[0]} - $${filters.priceRange[1]}` : '$0 - $500'}</Label>
                  <Slider
                    value={filters.priceRange || [0, 500]}
                    onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                    min={0}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Quick Filters */}
                <div className="space-y-2">
                  <Label>Quick Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online"
                        checked={filters.isOnline || false}
                        onCheckedChange={(checked) => updateFilter('isOnline', checked || undefined)}
                      />
                      <Label htmlFor="online">Online Now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.isVerified || false}
                        onCheckedChange={(checked) => updateFilter('isVerified', checked || undefined)}
                      />
                      <Label htmlFor="verified">Verified Only</Label>
                    </div>
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Select value={filters.rating?.toString()} onValueChange={(value) => updateFilter('rating', value ? parseFloat(value) : undefined)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      <SelectItem value="3.0">3.0+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {resultCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              {resultCount} creator{resultCount !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-creator-primary">
            <X className="h-4 w-4 mr-1" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.categories?.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => toggleCategory(category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.languages?.map((language) => (
            <Badge key={language} variant="secondary" className="flex items-center gap-1">
              {language}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => toggleLanguage(language)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.isOnline && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Online Now
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => clearFilter('isOnline')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.isVerified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Verified
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => clearFilter('isVerified')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.ageRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Age {filters.ageRange[0]}-{filters.ageRange[1]}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => clearFilter('ageRange')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.priceRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${filters.priceRange[0]}-${filters.priceRange[1]}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => clearFilter('priceRange')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.rating}+ Stars
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => clearFilter('rating')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}