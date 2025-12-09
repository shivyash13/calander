import React, { useState, useEffect, useCallback } from 'react';
import Calendar from './components/Calendar';
import DateDetailsModal from './components/DateDetailsModal';
import { MONTH_NAMES, FLOWER_PROMPTS, HISTORICAL_EVENTS } from './constants';
import { CalendarDay, LoadingState, DailyPeaceContent, HistoricalEvent } from './types';
import { generateFloralArt, generateDateIllustration, generatePeaceQuote } from './services/geminiService';

const App: React.FC = () => {
  // Start at January 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageState, setImageState] = useState<LoadingState>(LoadingState.IDLE);
  
  // Modal State
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<DailyPeaceContent | null>(null);
  const [modalHistoricalEvent, setModalHistoricalEvent] = useState<HistoricalEvent | null>(null);
  const [modalLoading, setModalLoading] = useState<LoadingState>(LoadingState.IDLE);

  // Cache to store generated monthly floral images
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  
  // Cache to store generated daily content (image + quote)
  const [dailyCache, setDailyCache] = useState<Record<string, DailyPeaceContent>>({});

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthName = MONTH_NAMES[monthIndex];
  const flowerName = FLOWER_PROMPTS[monthIndex];

  // Logic to build the days array
  const getCalendarDays = (date: Date): (CalendarDay | null)[] => {
    const y = date.getFullYear();
    const m = date.getMonth();
    
    // Day of week the month starts on (0=Sun, 6=Sat)
    const firstDayOfWeek = new Date(y, m, 1).getDay();
    // Total days in month
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    
    const days: (CalendarDay | null)[] = [];
    
    // Pad start
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Fill days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: d, isCurrentMonth: true });
    }
    
    return days;
  };

  const days = getCalendarDays(currentDate);

  // Fetch or retrieve image for the month
  useEffect(() => {
    const cacheKey = `${year}-${monthIndex}`;
    
    if (imageCache[cacheKey]) {
      setGeneratedImage(imageCache[cacheKey]);
      setImageState(LoadingState.SUCCESS);
      return;
    }

    const fetchImage = async () => {
      setImageState(LoadingState.LOADING);
      // Small delay to allow UI to show loading state if switching fast
      await new Promise(r => setTimeout(r, 100)); 
      
      const art = await generateFloralArt(flowerName);
      
      if (art) {
        setGeneratedImage(art);
        setImageCache(prev => ({ ...prev, [cacheKey]: art }));
        setImageState(LoadingState.SUCCESS);
      } else {
        setGeneratedImage(null);
        setImageState(LoadingState.ERROR);
      }
    };

    fetchImage();
  }, [year, monthIndex, flowerName, imageCache]);

  const handlePrev = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleDateClick = async (day: number) => {
    setSelectedDay(day);
    
    // Check for historical event
    const eventKey = `${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const historicalEvent = HISTORICAL_EVENTS[eventKey] || null;
    setModalHistoricalEvent(historicalEvent);

    // Cache Key for daily content
    const dailyCacheKey = `${year}-${monthIndex}-${day}`;

    // Check Cache
    if (dailyCache[dailyCacheKey]) {
      setModalContent(dailyCache[dailyCacheKey]);
      setModalLoading(LoadingState.SUCCESS);
      return;
    }

    // If not in cache, load it
    setModalLoading(LoadingState.LOADING);
    setModalContent(null);

    // Prepare context for image generation
    let promptContext = `A peaceful day on ${monthName} ${day}, ${year}`;
    let isHistorical = false;

    if (historicalEvent) {
       // Combine title and description for a rich prompt
       promptContext = `${historicalEvent.title}: ${historicalEvent.description}`;
       isHistorical = true;
    }

    // Parallel fetch for speed
    const [image, quote] = await Promise.all([
      generateDateIllustration(promptContext, isHistorical),
      generatePeaceQuote()
    ]);

    const newContent = { image, quote };
    
    // Save to cache
    setDailyCache(prev => ({ ...prev, [dailyCacheKey]: newContent }));
    
    setModalContent(newContent);
    setModalLoading(LoadingState.SUCCESS);
  };

  const closeDateModal = () => {
    setSelectedDay(null);
    setModalContent(null);
    setModalHistoricalEvent(null);
  };

  const getFullSelectedDate = () => {
    if (!selectedDay) return new Date();
    return new Date(year, monthIndex, selectedDay);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 flex flex-col items-center font-sans">
      <Calendar 
        monthName={monthName}
        year={year}
        days={days}
        imageUrl={generatedImage}
        imageLoading={imageState}
        onNext={handleNext}
        onPrev={handlePrev}
        onDateClick={handleDateClick}
      />

      <DateDetailsModal 
        isOpen={!!selectedDay}
        onClose={closeDateModal}
        date={getFullSelectedDate()}
        content={modalContent}
        historicalEvent={modalHistoricalEvent}
        loadingState={modalLoading}
      />

      <footer className="mt-8 text-stone-400 text-sm print:hidden text-center max-w-md">
        <p>Uses Gemini 2.5 Flash Image to generate a unique floral illustration for each month.</p>
        {!process.env.API_KEY && (
           <p className="text-red-400 mt-2">API Key missing. Images will not load.</p>
        )}
      </footer>
    </div>
  );
};

export default App;