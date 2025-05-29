
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SelectionBarProps {
  selectedImage: string;
  onConfirm: () => void;
}

const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedImage,
  onConfirm,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Icon Selected
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ready to confirm your choice
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Check className="h-4 w-4 mr-1" />
              Confirm Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionBar;
