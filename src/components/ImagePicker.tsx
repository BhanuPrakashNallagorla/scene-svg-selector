
import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ImageGrid from './ImageGrid';
import AIRecommendations from './AIRecommendations';
import SelectionBar from './SelectionBar';

const ImagePicker = () => {
  const [sceneInput, setSceneInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Mock SVG icons data
  const mockImages = [
    { id: '1', url: '/placeholder.svg', name: 'home-icon', keywords: ['home', 'house', 'building'] },
    { id: '2', url: '/placeholder.svg', name: 'user-icon', keywords: ['user', 'person', 'profile'] },
    { id: '3', url: '/placeholder.svg', name: 'search-icon', keywords: ['search', 'find', 'magnify'] },
    { id: '4', url: '/placeholder.svg', name: 'heart-icon', keywords: ['heart', 'love', 'favorite'] },
    { id: '5', url: '/placeholder.svg', name: 'star-icon', keywords: ['star', 'rating', 'favorite'] },
    { id: '6', url: '/placeholder.svg', name: 'mail-icon', keywords: ['mail', 'email', 'message'] },
    { id: '7', url: '/placeholder.svg', name: 'phone-icon', keywords: ['phone', 'call', 'contact'] },
    { id: '8', url: '/placeholder.svg', name: 'calendar-icon', keywords: ['calendar', 'date', 'schedule'] },
    { id: '9', url: '/placeholder.svg', name: 'settings-icon', keywords: ['settings', 'config', 'gear'] },
    { id: '10', url: '/placeholder.svg', name: 'camera-icon', keywords: ['camera', 'photo', 'image'] },
    { id: '11', url: '/placeholder.svg', name: 'music-icon', keywords: ['music', 'audio', 'sound'] },
    { id: '12', url: '/placeholder.svg', name: 'video-icon', keywords: ['video', 'play', 'media'] },
    { id: '13', url: '/placeholder.svg', name: 'cart-icon', keywords: ['cart', 'shopping', 'buy'] },
    { id: '14', url: '/placeholder.svg', name: 'lock-icon', keywords: ['lock', 'secure', 'privacy'] },
    { id: '15', url: '/placeholder.svg', name: 'globe-icon', keywords: ['globe', 'world', 'internet'] },
    { id: '16', url: '/placeholder.svg', name: 'cloud-icon', keywords: ['cloud', 'storage', 'sync'] },
  ];

  const aiRecommendations = mockImages.slice(0, 3);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const extractKeywords = (text: string) => {
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    setKeywords(words.slice(0, 8)); // Limit to 8 keywords
  };

  const handleSceneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSceneInput(value);
    
    if (value.length > 3) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        extractKeywords(value);
        setIsLoading(false);
      }, 500);
    } else {
      setKeywords([]);
    }
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId);
    toast({
      title: "Image Selected",
      description: "You can now confirm your selection below.",
    });
  };

  const handleConfirmSelection = () => {
    if (selectedImage) {
      toast({
        title: "Success!",
        description: "Your SVG icon has been selected successfully.",
      });
      // Here you would typically handle the final selection
      console.log('Selected image:', selectedImage);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SVG Icon Picker
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="relative overflow-hidden group"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 transition-transform group-hover:rotate-180" />
              ) : (
                <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scene Input Area */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <label htmlFor="scene-input" className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Describe your scene or use case
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                id="scene-input"
                type="text"
                placeholder="e.g., 'user profile dashboard with settings'"
                value={sceneInput}
                onChange={handleSceneInputChange}
                className="pl-12 h-14 text-lg border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-colors"
              />
            </div>
            
            {/* Keywords */}
            {keywords.length > 0 && (
              <div className="mt-4 animate-fade-in">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Extracted keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        {sceneInput && (
          <AIRecommendations
            recommendations={aiRecommendations}
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            isLoading={isLoading}
          />
        )}

        {/* Image Grid */}
        <ImageGrid
          images={mockImages}
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          isLoading={isLoading}
          keywords={keywords}
        />

        {/* Selection Bar */}
        {selectedImage && (
          <SelectionBar
            selectedImage={selectedImage}
            onConfirm={handleConfirmSelection}
          />
        )}
      </main>
    </div>
  );
};

export default ImagePicker;
