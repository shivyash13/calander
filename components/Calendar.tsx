import React from 'react';
import { CalendarDay, LoadingState } from '../types';
import { DAYS_OF_WEEK, MONTH_NAMES, HISTORICAL_EVENTS } from '../constants';

interface CalendarProps {
  monthName: string;
  year: number;
  days: (CalendarDay | null)[];
  imageUrl: string | null;
  imageLoading: LoadingState;
  onNext: () => void;
  onPrev: () => void;
  onDateClick: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  monthName, 
  year, 
  days, 
  imageUrl, 
  imageLoading,
  onNext, 
  onPrev,
  onDateClick
}) => {

  const monthIndex = MONTH_NAMES.indexOf(monthName);
  
  // Helper to get event details
  const getEvent = (day: number) => {
    const key = `${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return HISTORICAL_EVENTS[key];
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-8 bg-white min-h-[800px] shadow-2xl rounded-sm print:shadow-none print:w-full">
      
      {/* Artwork Section */}
      <div className="relative w-full h-64 flex justify-center items-center mb-4">
        {/* The Pink Blob Background */}
        <div 
          className="absolute w-40 h-40 bg-pink-100 rounded-full opacity-80 z-0"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(-10deg) translateY(10px)'
          }}
        />
        
        {/* Generated Image */}
        <div className="relative z-10 w-48 h-48 flex justify-center items-center">
          {imageLoading === LoadingState.LOADING ? (
            <div className="animate-pulse flex flex-col items-center">
               <div className="h-32 w-32 bg-gray-200 rounded-full mb-2"></div>
               <span className="text-gray-400 font-serif text-sm">Drawing flower...</span>
            </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Floral line art" 
              className="w-full h-full object-contain mix-blend-multiply filter contrast-125" 
            />
          ) : (
            <div className="text-gray-300 italic font-serif">
              (No Art Available)
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-10 w-full relative group">
        
        {/* Navigation Buttons (Hidden in print, visible on hover) */}
        <button 
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-gray-600 transition-colors print:hidden"
          aria-label="Previous Month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button 
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-gray-600 transition-colors print:hidden"
          aria-label="Next Month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <h1 className="text-7xl mb-1 text-black" style={{ fontFamily: '"Sacramento", cursive' }}>
          {monthName}
        </h1>
        <h2 className="text-3xl text-gray-800 tracking-widest" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          {year}
        </h2>
      </div>

      {/* Grid Section */}
      <div className="w-full">
        {/* Days of Week */}
        <div className="grid grid-cols-7 mb-6">
          {DAYS_OF_WEEK.map((day) => (
            <div 
              key={day} 
              className="text-center text-xl text-gray-900"
              style={{ fontFamily: '"Shadows Into Light", cursive' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7 gap-y-4 gap-x-1">
          {days.map((dayData, index) => {
            if (!dayData) {
              return <div key={`empty-${index}`} />;
            }
            
            const event = getEvent(dayData.date);

            return (
              <button 
                key={dayData.date} 
                onClick={() => onDateClick(dayData.date)}
                className={`
                  flex flex-col items-center justify-start min-h-[4rem]
                  relative text-gray-700 
                  hover:text-pink-500 hover:scale-105 transition-all duration-200 
                  cursor-pointer focus:outline-none focus:text-pink-600
                  ${event ? 'text-blue-900' : ''}
                `}
                aria-label={`View details for ${monthName} ${dayData.date}`}
              >
                <span 
                  className={`text-2xl leading-none ${event ? 'font-bold' : ''}`} 
                  style={{ fontFamily: '"Shadows Into Light", cursive' }}
                >
                  {dayData.date}
                </span>
                
                {event && (
                  <span 
                    className="mt-1 text-[0.6rem] leading-tight text-blue-800 font-sans font-medium text-center line-clamp-2 px-1 w-full break-words"
                  >
                    {event.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Print Footer */}
      <div className="hidden print:block fixed bottom-4 w-full text-center text-xs text-gray-400 font-sans">
        Generated with Gemini 2.5
      </div>
    </div>
  );
};

export default Calendar;