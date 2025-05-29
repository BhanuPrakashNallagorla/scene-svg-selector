
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Image {
  id: string;
  url: string;
  name: string;
  keywords: string[];
}

interface AIRecommendationsProps {
  recommendations: Image[];
  onImageSelect: (imageId: string) => void;
  selectedImage: string | null;
  isLoading: boolean;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  onImageSelect,
  selectedImage,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              AI Recommendations
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            AI Recommendations
          </h3>
          <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
              Smart picks for you
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendations.map((image) => (
            <Button
              key={image.id}
              variant="ghost"
              className={cn(
                "h-auto p-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg group",
                selectedImage === image.id
                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/30"
                  : "hover:bg-white dark:hover:bg-slate-700"
              )}
              onClick={() => onImageSelect(image.id)}
            >
              <div className="text-center space-y-2">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-800 dark:to-blue-800 rounded-lg p-4 group-hover:shadow-inner">
                  <div className="w-full h-full bg-slate-300 dark:bg-slate-600 rounded opacity-60" />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  {image.name}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
