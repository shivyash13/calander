import React from 'react';
import { DailyPeaceContent, LoadingState, HistoricalEvent } from '../types';

interface DateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  content: DailyPeaceContent | null;
  historicalEvent?: HistoricalEvent | null;
  loadingState: LoadingState;
}

const DateDetailsModal: React.FC<DateDetailsModalProps> = ({
  isOpen,
  onClose,
  date,
  content,
  historicalEvent,
  loadingState
}) => {
  if (!isOpen) return null;

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl animate-fade-in flex flex-col items-center max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-4xl mb-2 text-center" style={{ fontFamily: '"Sacramento", cursive' }}>
          {formattedDate}
        </h2>
        
        {/* Historical Event Section */}
        {historicalEvent && (
          <div className="mb-6 w-full text-center border-b border-stone-200 pb-4">
            <h3 className="text-2xl text-blue-900 mb-1 font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              {historicalEvent.title}
            </h3>
            <div className="text-xs text-stone-500 font-sans mb-3 tracking-widest uppercase">
              {historicalEvent.originalDate}
            </div>
            <p className="text-stone-600 leading-relaxed font-sans text-sm">
              {historicalEvent.description}
            </p>
          </div>
        )}

        <div className="w-full aspect-square bg-stone-50 mb-6 flex items-center justify-center rounded-sm overflow-hidden border border-stone-100">
          {loadingState === LoadingState.LOADING ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin"></div>
              <span className="text-stone-400 font-serif italic">Finding peace...</span>
            </div>
          ) : content?.image ? (
            <img 
              src={content.image} 
              alt="Peace and calmness" 
              className="w-full h-full object-cover animate-fade-in"
            />
          ) : (
            <span className="text-stone-300 font-serif italic">No image available</span>
          )}
        </div>

        <div className="text-center min-h-[4rem] flex items-center justify-center">
           {loadingState === LoadingState.LOADING ? (
             <span className="h-2 w-24 bg-stone-100 rounded animate-pulse"></span>
           ) : content?.quote ? (
             <p className="text-xl text-stone-700 leading-relaxed font-light italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
               "{content.quote}"
             </p>
           ) : null}
        </div>
      </div>
    </div>
  );
};

export default DateDetailsModal;