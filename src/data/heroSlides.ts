export type HeroSlide = {
  title: string;
  features: string[];
  image: string;
  cta?: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    title: "Hyderabad's Most Trusted IAS Academy",
    features: [
      'Expert Faculty with Proven Results',
      'Comprehensive Study Materials & Mock Tests',
    ],
    image: '/assets/hero-banner.jpg',
  },
  {
    title: 'Structured UPSC Preparation That Works',
    features: [
      'Mentorship + Answer Writing Practice',
      'Current Affairs, Test Series, and Doubts Support',
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop',
  },
  {
    title: 'Start Smart. Stay Consistent. Clear UPSC.',
    features: [
      'Foundation to Mains with Interview Guidance',
      'Integrated Timetable and Study Plans',
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
  },
  {
    title: 'Personalized Mentorship for Every Aspirant',
    features: [
      'One-on-One Guidance from Experienced IAS Officers',
      'Strategy Sessions & Performance Analysis',
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop',
  },
  {
    title: "Join Hyderabad's Premier IAS Community",
    features: [
      'Regular Seminars, Guest Lectures & Discussion Groups',
      'State-of-the-Art Infrastructure & Library',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
  },
];
