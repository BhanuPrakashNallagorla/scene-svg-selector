
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Image {
  id: string;
  url: string;
  name: string;
  keywords: string[];
}

interface ImageGridProps {
  images: Image[];
  onImageSelect: (imageId: string) => void;
  selectedImage: string | null;
  isLoading: boolean;
  keywords: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageSelect,
  selectedImage,
  isLoading,
  keywords,
}) => {
  // Filter images based on keywords if any exist
  const filteredImages = keywords.length > 0 
    ? images.filter(image => 
        keywords.some(keyword => 
          image.keywords.some(imageKeyword => 
            imageKeyword.includes(keyword) || keyword.includes(imageKeyword)
          )
        )
      )
    : images;

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            SVG Icons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
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
    <div className="mb-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            SVG Icons
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredImages.length} icons available
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredImages.map((image) => (
            <Button
              key={image.id}
              variant="ghost"
              className={cn(
                "h-auto p-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md group",
                selectedImage === image.id
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
              onClick={() => onImageSelect(image.id)}
            >
              <div className="text-center space-y-2">
                <div className="aspect-square bg-slate-100 dark:bg-slate-600 rounded-lg p-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-500 transition-colors">
                  <div className="w-full h-full bg-slate-300 dark:bg-slate-400 rounded opacity-60" />
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                  {image.name}
                </p>
              </div>
            </Button>
          ))}
        </div>
        
        {filteredImages.length === 0 && keywords.length > 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 dark:text-slate-500 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              No icons found matching your keywords. Try different terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
