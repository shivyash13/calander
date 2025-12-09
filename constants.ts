export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const FLOWER_PROMPTS = [
  'Carnation', // Jan
  'Violet',    // Feb
  'Daffodil',  // Mar
  'Daisy',     // Apr
  'Lily of the Valley', // May
  'Rose',      // Jun
  'Larkspur',  // Jul
  'Gladiolus', // Aug
  'Aster',     // Sep
  'Marigold',  // Oct
  'Chrysanthemum', // Nov
  'Narcissus'  // Dec
];

// Map of MM-DD to event details
export const HISTORICAL_EVENTS: Record<string, { title: string, description: string, originalDate: string }> = {
  '12-06': {
    title: 'Mahaparinirvan Diwas',
    description: 'On this day, Dr. B.R. Ambedkar breathed his last at his home in Delhi. Millions of followers gathered to pay their respects to the architect of the Indian Constitution and the revivalist of Buddhism in India.',
    originalDate: 'December 6, 1956'
  },
  '04-14': {
    title: 'Janma Jayanti (Birth)',
    description: 'Bhimrao Ramji Ambedkar was born in the military cantonment of Mhow (now Dr. Ambedkar Nagar). He was the 14th and last child of Ramji Maloji Sakpal and Bhimabai.',
    originalDate: 'April 14, 1891'
  },
  '03-20': {
    title: 'Mahad Satyagraha',
    description: 'Dr. Ambedkar led the Mahad Satyagraha to assert the rights of Dalits to use water from the Chavadar Tale (public tank). This was a turning point in the Dalit movement for human rights.',
    originalDate: 'March 20, 1927'
  },
  '10-14': {
    title: 'Dhamma Chakra Pravartan',
    description: 'In a massive ceremony at Deekshabhoomi, Nagpur, Dr. Ambedkar along with 600,000 followers embraced Buddhism, marking the revival of the Dhamma in India.',
    originalDate: 'October 14, 1956'
  },
  '11-26': {
    title: 'Constitution Day',
    description: "The Constituent Assembly of India adopted the Constitution of India, drafted by the committee chaired by Dr. Ambedkar. He is often called the 'Father of the Indian Constitution'.",
    originalDate: 'November 26, 1949'
  }
};

// Fallback images in case API key is missing or fails (Picsum doesn't do line art well, so we use a generic placeholder strategy if needed, but the code handles generation)
export const PLACEHOLDER_IMAGE = 'https://picsum.photos/400/400?grayscale';