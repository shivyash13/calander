export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
}

export interface MonthData {
  name: string;
  year: number;
  days: (CalendarDay | null)[];
  flowerPrompt: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  url: string | null;
  description: string;
}

export interface DailyPeaceContent {
  image: string | null;
  quote: string | null;
}

export interface HistoricalEvent {
  title: string;
  description: string;
  originalDate: string;
}