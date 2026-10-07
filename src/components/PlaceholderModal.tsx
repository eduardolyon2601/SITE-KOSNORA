import React from 'react';
import { X, FileText } from 'lucide-react';

interface PlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const PlaceholderModal: React.FC<PlaceholderModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 text-neutral-900 p-6 sm:p-8 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-neutral-950">{title}</h3>
        </div>

        <div className="text-sm text-neutral-700 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="whitespace-pre-line text-xs sm:text-sm">
            {content}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
